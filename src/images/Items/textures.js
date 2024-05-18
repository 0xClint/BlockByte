import { NearestFilter, TextureLoader } from "three";
import flower1L1 from "./flower1L1.png";
import flower1L2 from "./flower1L2.png";
import flower1L3 from "./flower1L3.png";

import flower2L1 from "./flower2L1.png";
import flower2L2 from "./flower2L2.png";
import flower2L3 from "./flower2L3.png";

import flower3L1 from "./flower3L1.png";
import flower3L2 from "./flower3L2.png";
import flower3L3 from "./flower3L3.png";

import flower4L1 from "./flower4L1.png";
import flower4L2 from "./flower4L2.png";
import flower4L3 from "./flower4L3.png";

import flower5L1 from "./flower5L1.png";
import flower5L2 from "./flower5L2.png";
import flower5L3 from "./flower5L3.png";

const flower1L1Texture = new TextureLoader().load(flower1L1);
const flower1L2Texture = new TextureLoader().load(flower1L2);
const flower1L3Texture = new TextureLoader().load(flower1L3);

const flower2L1Texture = new TextureLoader().load(flower2L1);
const flower2L2Texture = new TextureLoader().load(flower2L2);
const flower2L3Texture = new TextureLoader().load(flower2L3);

const flower3L1Texture = new TextureLoader().load(flower3L1);
const flower3L2Texture = new TextureLoader().load(flower3L2);
const flower3L3Texture = new TextureLoader().load(flower3L3);

const flower4L1Texture = new TextureLoader().load(flower4L1);
const flower4L2Texture = new TextureLoader().load(flower4L2);
const flower4L3Texture = new TextureLoader().load(flower4L3);

const flower5L1Texture = new TextureLoader().load(flower5L1);
const flower5L2Texture = new TextureLoader().load(flower5L2);
const flower5L3Texture = new TextureLoader().load(flower5L3);



flower1L1Texture.magFilter = NearestFilter;
flower1L2Texture.magFilter = NearestFilter;
flower1L3Texture.magFilter = NearestFilter;

flower2L1Texture.magFilter = NearestFilter;
flower2L2Texture.magFilter = NearestFilter;
flower2L3Texture.magFilter = NearestFilter;

flower3L1Texture.magFilter = NearestFilter;
flower3L2Texture.magFilter = NearestFilter;
flower3L3Texture.magFilter = NearestFilter;

flower4L1Texture.magFilter = NearestFilter;
flower4L2Texture.magFilter = NearestFilter;
flower4L3Texture.magFilter = NearestFilter;

flower5L1Texture.magFilter = NearestFilter;
flower5L2Texture.magFilter = NearestFilter;
flower5L3Texture.magFilter = NearestFilter;


export {
  flower1L1Texture,
  flower1L2Texture,
  flower1L3Texture,
  flower2L1Texture,
  flower2L2Texture,
  flower2L3Texture,
  flower3L1Texture,
  flower3L2Texture,
  flower3L3Texture,
  flower4L1Texture,
  flower4L2Texture,
  flower4L3Texture,
  flower5L1Texture,
  flower5L2Texture,
  flower5L3Texture,
};
