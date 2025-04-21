import React, { useState } from "react";

function DarkModeSettings({ DarkTheme }) {
	// State variables to track the selected mode for each setting
	const [websiteMode, setWebsiteMode] = useState(DarkTheme.global.value);
	const [editorMode, setEditorMode] = useState(DarkTheme.editor.value);

	const handleSave = () => {
		// You can do something more interesting here, like:
		// - Storing preferences in localStorage
		// - Sending data to a server via an API call
		// - Triggering a global theme switch, etc.
		DarkTheme.global.set(websiteMode);
		DarkTheme.editor.set(editorMode);

		console.log(`Saved preference : { Website Mode: ${websiteMode}, Code Editor Mode: ${editorMode} }`);
	};

	return (
		<div className="settings-container">
			<h1>Dark Mode Settings</h1>

			<div className="option-row">
				<label>Website</label>
				<div className="">
					<button
						className={`btn ${websiteMode && "active bg-dark text-light"}`}
						onClick={() => setWebsiteMode(true)}
						disabled={websiteMode}
					>
						Dark
					</button>
					<button
						className={`btn ${!websiteMode && "active"}`}
						onClick={() => setWebsiteMode(false)}
						disabled={!websiteMode}
					>
						Light
					</button>
				</div>
			</div>

			<div className="option-row">
				<label>Code Editor</label>
				<div className="">
					<button
						className={`btn ${editorMode && "active bg-dark text-light"}`}
						onClick={() => setEditorMode(true)}
						disabled={editorMode}
					>
						Dark
					</button>
					<button
						className={`btn ${!editorMode && "active"}`}
						onClick={() => setEditorMode(false)}
						disabled={!editorMode}
					>
						Light
					</button>
				</div>
			</div>

			<button className="save-button" onClick={handleSave}>Save</button>
		</div>
	);
}

export default DarkModeSettings;
