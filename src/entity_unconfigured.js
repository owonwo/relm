import stampit from 'stampit'

import { uuidv4 } from './util.js'
import { Component } from './component.js'

/**
 * An Entity is the most basic thing in the game world. It has 
 * only an identifier (.uuid) and can potentially be configured
 * with a Stage.
 * 
 * Example:
 *   const ConfiguredEntity = Entity.conf({ stage: theStage })
 *   let monster = ConfiguredEntity() // do more with monster
 */
const EntityUnconfigured = stampit(Component, {
  name: 'Entity',

  // Static configuration. See https://stampit.js.org/api/configuration.
  conf: {
    /**
     * @type {Stage}
     */
    stage: null,

    /**
     * @type {ResourceLoader}
     */
    resources: null,
  },

  props: {
    /**
     * @type {string}
     */
    uuid: null,

    /**
     * @type {Stage}
     */
    stage: null,
  },

  init({ uuid = this.uuid, stage, resources }, { stamp }) {
    this.uuid = uuid || uuidv4()
    this.stage = stage || stamp.compose.configuration.stage
    this.resources = resources || stamp.compose.configuration.resources
  },

  methods: {
    /**
     * Note that each Entity can have multiple Components, each with
     * `setup`, `update` and `teardown` methods. These methods will be
     * called automatically during the lifecycle of an Entity as it
     * moves on stage, is rendered there, and moves off stage.
     */
  }
})

export { EntityUnconfigured }
