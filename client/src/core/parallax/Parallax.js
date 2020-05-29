import React from "react";
import { Parallax } from "react-parallax";
import boy from '../../resources/tshirt.jpg'
import clothes from '../../resources/goggles.jpg'
import bw from '../../resources/blackwhite.jpg'
import outdoor from '../../resources/outdoor.jpg'
import shoes from '../../resources/shoes.jpg';
import blazer from '../../resources/blazer.jpg';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const insideStyles = {
  background: "none",
  opactiy:"0.5",
  padding: 10,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

const ParallaxView = () => (
  <div style={styles}>
  <Parallax
      bgImage={bw}
      className="mb-0"
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}><span><h1 className="display-4 text-white">Collection for </h1><h1 className="display-4 text-white">Womens</h1></span></div>
      </div>
    </Parallax>
    <Parallax
      bgImage={blazer}
      strength={200}
      className="mt-0 mb-0"
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}><h1 className="display-4 text-white">Formal Attires</h1></div>
      </div>
    </Parallax>
    <Parallax
    bgImage={shoes}
    className="mb-0"
    strength={200}
    renderLayer={percentage => (
      <div>
        <div
          style={{
            position: "absolute",
            background: `rgba(255, 125, 0, ${percentage * 1})`,
            left: "50%",
            top: "50%",
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            width: percentage * 500,
            height: percentage * 500
          }}
        />
      </div>
    )}
  >
    <div style={{ height: 500 }}>
      <div style={insideStyles}><span><h1 className="display-4 text-white">Shoes that never</h1><h1 className="display-4 text-white">leaves you.</h1></span></div>
    </div>
  </Parallax>
    <Parallax
      bgImage={outdoor}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}><h1 className="display-4 text-white">Outdoor fashions</h1></div>
      </div>
    </Parallax>
    <div className="rounded-pill" style={{ opacity:"0.5"}}>
    <h2 className="text-dark display-4">And much more to explore!!!</h2>
    </div>
  </div>
);

export default ParallaxView;
