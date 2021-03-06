import stampit from 'stampit'

import { Component } from './component.js'
// TODO: figure out why these dependencies can't be mentioned in stampit() constructor
import { HasAnimationMixer } from './has_animation_mixer.js'
import { FollowsTarget } from './follows_target.js'

const WalksWhenMoving = stampit(Component, {
  methods: {
    setup() {
      this.walkingStopOnce = true
    },

    update(delta) {
      if (this.distanceToTarget > this.closeEnough) {
        this.walkingStopOnce = false
        if (!this.walkingStartOnce) {
          this.walkingStartOnce = true
          if (!this.clips.walking.isRunning()) {
            this.clips.walking.play()
          }
          this.clips.walking.paused = false
          this.clips.walking.stopWarping().warp(0.0, 1.0, 0.1)
        }
      } else {
        this.walkingStartOnce = false
        if (!this.walkingStopOnce) {
          this.walkingStopOnce = true
          this.clips.walking.stopWarping().warp(1.0, 0.0, 0.3)
        }
      }
    }
  }
})

export { WalksWhenMoving }
