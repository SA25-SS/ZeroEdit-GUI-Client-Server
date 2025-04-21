import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { Text } from "@automerge/automerge"
import { isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { RepoContext } from '@automerge/automerge-repo-react-hooks'

import { Peer } from "peerjs";
import { PeerjsNetworkAdapter } from "automerge-repo-network-peerjs";
import { loadSavedUsername } from './utils/storage';

import { CLIENT_SERVER_MODE } from './utils/constants';

const repo = new Repo({
    network: [],
    storage: new IndexedDBStorageAdapter(),
});

const rootDocUrl = `${document.location.hash.substring(1)}`;
const userName = loadSavedUsername();

let handle;
if (isValidAutomergeUrl(rootDocUrl)) {
    handle = repo.find(rootDocUrl);
    console.log("Connected to Doc : ", handle);

} else {
    handle = repo.create(() => ({
        fileName: "somethingcool.js",
        fileContent: "console.log('Something Cool')",
        outputStatus: null,
        outputContent: null,
        owner: null,
        activeUsers: []
    }));
    console.log("Created new Doc : ", handle);
}

if (CLIENT_SERVER_MODE) {
    repo.networkSubsystem.addNetworkAdapter(
        // new BrowserWebSocketClientAdapter("ws://172.17.48.162:3030/ws/thatroom?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqMTIzIiwiZXhwIjoxNzQ0OTgzODk4fQ.Aj1vieiMwtS4rsh3GFcjxdYHtbWGXXXyiSJGf-3onI0", 300), 
        // new BrowserWebSocketClientAdapter("wss://sync.automerge.org"),
        new BrowserWebSocketClientAdapter("ws://13.203.199.13/sync/ws"),
    )
}
// Assume P2P mode if not Client Server
else {
    const peer = new Peer(userName, {
        host: '0.peerjs.com',
        port: 443,
        path: '/',
        secure: true
    });

    let SELF_PEER_ID;

    peer.on('open', id => {
        console.log('👉 My PeerJS ID:', id);
        SELF_PEER_ID = id;
        console.log(`${document.location.origin}/?host=${SELF_PEER_ID}#${document.location.hash.substring(1)}`);

        const hostPerUrl = (new URLSearchParams(document.location.search)).get("host");
        console.log(document.location.search);
        if (hostPerUrl && hostPerUrl !== SELF_PEER_ID) {
            console.log("dialing →", hostPerUrl);
            dial(hostPerUrl);
        }
        else {
            console.log("No Host");
        }
    })

    peer.on('connection', conn => {
        console.log("Connection connection :", conn);
        const adapter = new PeerjsNetworkAdapter(conn);
        repo.networkSubsystem.addNetworkAdapter(adapter);
    })

    function dial(remotePeerId) {
        const conn = peer.connect(remotePeerId);
        console.log("Connection requested to :", remotePeerId);
        conn.on('open', () => {
            console.log("Connection open :", remotePeerId);
            const adapter = new PeerjsNetworkAdapter(conn);
            repo.networkSubsystem.addNetworkAdapter(adapter);
        })
    }

}

const docUrl = handle.url;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RepoContext.Provider value={repo} >
            <App docUrl={docUrl} />
        </RepoContext.Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
