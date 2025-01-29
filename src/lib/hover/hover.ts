export const HoverProviderContext = Symbol("HoverProvider");
export const HoverFrameContext = Symbol("HoverContext");

export interface HoverFrame {
	// hovering?: boolean;
	targetContainer: HTMLElement | null;
	// setContainer: (element: HTMLElement) => void;
}
