import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

import Grid from "./Grid";

type GridCanvasProps = {
    loading: boolean;
};

export default function GridCanvas({ loading }: GridCanvasProps) {
    if (loading) {
        return (
            <div className="rounded-lg border border-white/10 bg-black/40 px-5 py-4 text-sm text-zinc-300 backdrop-blur-xl">
                Loading grid...
            </div>
        );
    }

    return (
        <TransformWrapper
            initialScale={1}
            // minScale={0.5}
            maxScale={2}
            wheel={{
                step: 0.1,
            }}
            doubleClick={{
                disabled: true,
            }}
        >
            <TransformComponent>
                <Grid />
            </TransformComponent>
        </TransformWrapper>
    );
}
