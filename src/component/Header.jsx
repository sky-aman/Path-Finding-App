
import React, { useEffect, useRef, useState } from "react";
import ShowHelp from "./ShowHelp";
import Controls from "./Controls";
import AlgorithmSelection from "./AlgorithmSelection";
import ActionButtons from "./ActionButtons";
import Stats from "./Stats";

export default function Header() {

	return (
		<div className="max-w-7xl mx-auto">
			<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
				<ShowHelp />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <Controls />
                    <AlgorithmSelection />
                    <ActionButtons />
                </div>
                <Stats />
			</div>
		</div>
	);
}
