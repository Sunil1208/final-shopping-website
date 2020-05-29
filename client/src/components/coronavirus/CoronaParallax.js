import React from "react";
import { Parallax } from "react-parallax";
import delivery from '../../resources/delivery.png'

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

const DeliveryParallaxView = () => (
  <div style={styles}>
  <Parallax
      bgImage={delivery}
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
        <div style={insideStyles}><span><h1 className="display-4 text-white">Delivery at your </h1><h1 className="display-4 text-white">Doorstep</h1></span></div>
      </div>
    </Parallax>
  </div>
);

export default DeliveryParallaxView;
