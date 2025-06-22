import { ImageFiltering, ImageSource, Sound } from 'excalibur';

// import backgrounds
import backgroundPath from '/assets/images/backgrounds/background1.png?url';
import background2Path from '/assets/images/backgrounds/background2.png?url';

// import clouds
import cloud1Path from '/assets/images/backgrounds/cloud1.png?url';
import cloud2Path from '/assets/images/backgrounds/cloud2.png?url';
import cloud3Path from '/assets/images/backgrounds/cloud3.png?url';
import cloud4Path from '/assets/images/backgrounds/cloud4.png?url';
import cloud5Path from '/assets/images/backgrounds/cloud5.png?url';
import cloud6Path from '/assets/images/backgrounds/cloud6.png?url';
import cloud7Path from '/assets/images/backgrounds/cloud7.png?url';
import cloud8Path from '/assets/images/backgrounds/cloud8.png?url';

// import diety
import moonDietyPath from '/assets/sprites/characters/dieties/sunandmoon.png?url';

// import player and all possible party members
import heroPath from '/assets/sprites/characters/main/player/Character006.png?url';
import heroRunningPath from '/assets/sprites/characters/main/player/Chara006.png?url';
import delsaranPath from '/assets/sprites/characters/main/Delsaran/Character041.png?url';

// import music
// import themeMP3 from "/assets/audio/music/OST 5 - Theme.mp3";
// import themeOgg from "/assets/audio/music/OST 5 - Theme.ogg";
// import themeWav from "/assets/audio/music/OST 5 - Theme.wav";

// import sounds
// import collisionSound from '/assets/audio/effects/bump-dur2Short-pitch1Low.wav';
// import walkingSound from '/assets/audio/effects/Steps_carpet-013.ogg';
// import talkingSound from '/assets/audio/effects/bounce-dur2Short-pitch3High.wav';

export const titleMenuResources = {
  BackgroundPng: new ImageSource(backgroundPath, false, ImageFiltering.Pixel),
  Background2Png: new ImageSource(background2Path, false, ImageFiltering.Pixel),
  Cloud1Png: new ImageSource(cloud1Path, false, ImageFiltering.Pixel),
  Cloud2Png: new ImageSource(cloud2Path, false, ImageFiltering.Pixel),
  Cloud3Png: new ImageSource(cloud3Path, false, ImageFiltering.Pixel),
  Cloud4Png: new ImageSource(cloud4Path, false, ImageFiltering.Pixel),
  Cloud5Png: new ImageSource(cloud5Path, false, ImageFiltering.Pixel),
  Cloud6Png: new ImageSource(cloud6Path, false, ImageFiltering.Pixel),
  Cloud7Png: new ImageSource(cloud7Path, false, ImageFiltering.Pixel),
  Cloud8Png: new ImageSource(cloud8Path, false, ImageFiltering.Pixel),
  MoonDietyPng: new ImageSource(moonDietyPath, false, ImageFiltering.Pixel),
  //   Music: new Sound(themeMP3, themeWav, themeOgg),
  // add player and all possible party members
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  HeroRunningSpriteSheetPng: new ImageSource(
    heroRunningPath,
    false,
    ImageFiltering.Pixel
  ),
  DelsaranSpriteSheetPng: new ImageSource(
    delsaranPath,
    false,
    ImageFiltering.Pixel
  ),
};
