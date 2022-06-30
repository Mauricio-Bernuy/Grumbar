import React, { Component } from 'react';

const parseNumber = prop => parseFloat(prop) || 0;

const getSize = (el) => {
    if (el === window || el === document.body) {
	      return [window.innerWidth, window.innerHeight];
	    }

    let temporary = false;

    if (!el.parentNode && document.body) {
	      temporary = true;
	      document.body.appendChild(el);
	    }

    const rect = el.getBoundingClientRect();
    const styles = getComputedStyle(el);
    const height =
	    (rect.height | 0) +
	    parseNumber(styles.getPropertyValue('margin-top')) +
	    parseNumber(styles.getPropertyValue('margin-bottom'));
    const width =
	    (rect.width | 0) +
	    parseNumber(styles.getPropertyValue('margin-left')) +
	    parseNumber(styles.getPropertyValue('margin-right'));

    if (temporary && document.body) {
	      document.body.removeChild(el);
	    }

    return [width, height];
};

export default class ResponsiveCanvas extends Component {
  static defaultProps = {
	scale: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  };

  state = {
	width: 0,
	height: 0,
  };

  $canvas;

  componentDidMount() {
	window.addEventListener('resize', this.handleResize, false);
	this.setSize();
  }

  componentWillUnmount() {
	window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize = () => {
	this.setSize();
	this.props.onResize();
  };

  setSize = () => {
	const parent = this.$canvas.parentElement;

	if (!parent) {
	  return;
	}

	const [width, height] = getSize(parent);

	this.setState({ width, height });
  };

  setRef = (el) => {
	if (!el) {
	  return;
	}

	const { canvasRef } = this.props;

	this.$canvas = el;
	if (typeof canvasRef === 'function') {
	  canvasRef(el);
	}
  };

  render() {
	const { scale, onResize, canvasRef, ...props } = this.props;
	const { width, height } = this.state;

	return (
	  <canvas
	  {...props}
	  ref={this.setRef}
	  width={width * scale}
	  height={height * scale}
	  style={{ width, height }}
	/>
		);
  }
}
