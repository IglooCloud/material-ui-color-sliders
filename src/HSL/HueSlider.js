import React, { Component } from "react"
import Slider from "@material-ui/core/Slider"
import withStyles from "@material-ui/core/styles/withStyles"
import tinyColor from "tinycolor2"
import HSLSliderContext from "./HSLSliderContext"

export default class ContextInjector extends Component {
  static contextType = HSLSliderContext

  render() {
    return <HueSliderWithStyles {...this.context} {...this.props} />
  }
}

const HueSliderWithStyles = withStyles(() => ({
  rail: {
    background:
      "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
    height: "8px",
    borderRadius: "4px",
    opacity: 1,
  },
  thumb: {
    width: "20px",
    height: "20px",
    marginTop: "-6px",
    marginLeft: "-10px",
    color: "white",
    backgroundColor: "white",
    boxShadow: ({ hue }) =>
      "0px 0px 0px 2px " + tinyColor({ h: hue, s: 1, l: 0.5 }),
    "&:hover": {
      boxShadow: ({ hue }) =>
        "0px 0px 0px 8px " + tinyColor({ h: hue, s: 1, l: 0.5 }).setAlpha(0.16),
    },
    "&.Mui-focusVisible": {
      boxShadow: ({ hue }) =>
        "0px 0px 0px 8px " + tinyColor({ h: hue, s: 1, l: 0.5 }).setAlpha(0.16),
    },
    "&.MuiSlider-active": {
      boxShadow: ({ hue }) =>
        "0px 0px 0px 14px " +
        tinyColor({ h: hue, s: 1, l: 0.5 }).setAlpha(0.16),
    },
  },
}))(
  class HueSlider extends Component {
    render() {
      const {
        classes: { rail, thumb },
        style,
        onChange = () => {},
        onChangeCommitted = () => {},
        hue,
        setHue,
      } = this.props

      return (
        <Slider
          track={false}
          classes={{ rail, thumb }}
          min={0}
          max={359}
          style={{ ...style, padding: "13px 0" }}
          onChange={(_, value) => {
            setHue(value)
            onChange(value)
          }}
          value={hue}
          onChangeCommitted={onChangeCommitted}
        />
      )
    }
  }
)
