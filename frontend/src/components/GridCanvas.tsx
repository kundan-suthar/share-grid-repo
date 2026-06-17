import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

import Grid from "./Grid";

export default function GridCanvas() {
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