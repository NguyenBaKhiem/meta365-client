import React from "react";
import { Input, Slider, SliderRange, SliderTrack, Wrapper } from "./StyledRangeInput";

const RangeInput = () => {
    return(
        <>
            <Wrapper>
                <Input type="range" className="thumb--zindex-3" />
                <Input type="range" className="thumb--zindex-4" />
                <Slider>
                    <SliderTrack />
                    <SliderRange ref={range} />
                </Slider>
            </Wrapper>
        </>
    )
}

export default RangeInput;