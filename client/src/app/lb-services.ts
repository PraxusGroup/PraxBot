// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

function getHost(url) {
  var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
  return m ? m[1] : null;
}

var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.Gamer
 * @header lbServices.Gamer
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Gamer` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Gamer",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/gamers/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Gamer.voiplogs.findById() instead.
        "prototype$__findById__voiplogs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/voiplogs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Gamer.voiplogs.destroyById() instead.
        "prototype$__destroyById__voiplogs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/voiplogs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.voiplogs.updateById() instead.
        "prototype$__updateById__voiplogs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/voiplogs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Gamer.games.findById() instead.
        "prototype$__findById__games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/:fk",
          method: "GET"
        },

        // INTERNAL. Use Gamer.games.destroyById() instead.
        "prototype$__destroyById__games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.games.updateById() instead.
        "prototype$__updateById__games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Gamer.games.link() instead.
        "prototype$__link__games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Gamer.games.unlink() instead.
        "prototype$__unlink__games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.games.exists() instead.
        "prototype$__exists__games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Gamer.voiplogs() instead.
        "prototype$__get__voiplogs": {
          isArray: true,
          url: urlBase + "/gamers/:id/voiplogs",
          method: "GET"
        },

        // INTERNAL. Use Gamer.voiplogs.create() instead.
        "prototype$__create__voiplogs": {
          url: urlBase + "/gamers/:id/voiplogs",
          method: "POST"
        },

        // INTERNAL. Use Gamer.voiplogs.destroyAll() instead.
        "prototype$__delete__voiplogs": {
          url: urlBase + "/gamers/:id/voiplogs",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.voiplogs.count() instead.
        "prototype$__count__voiplogs": {
          url: urlBase + "/gamers/:id/voiplogs/count",
          method: "GET"
        },

        // INTERNAL. Use Gamer.games() instead.
        "prototype$__get__games": {
          isArray: true,
          url: urlBase + "/gamers/:id/games",
          method: "GET"
        },

        // INTERNAL. Use Gamer.games.create() instead.
        "prototype$__create__games": {
          url: urlBase + "/gamers/:id/games",
          method: "POST"
        },

        // INTERNAL. Use Gamer.games.destroyAll() instead.
        "prototype$__delete__games": {
          url: urlBase + "/gamers/:id/games",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.games.count() instead.
        "prototype$__count__games": {
          url: urlBase + "/gamers/:id/games/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#create
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/gamers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#createMany
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/gamers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#upsert
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/gamers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#exists
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/gamers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#findById
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/gamers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#find
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/gamers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#findOne
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/gamers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#updateAll
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/gamers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#deleteById
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/gamers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#count
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/gamers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#prototype$updateAttributes
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/gamers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamer#createChangeStream
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/gamers/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Game.gamers.findById() instead.
        "::findById::Game::gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/:fk",
          method: "GET"
        },

        // INTERNAL. Use Game.gamers.destroyById() instead.
        "::destroyById::Game::gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Game.gamers.updateById() instead.
        "::updateById::Game::gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Game.gamers.link() instead.
        "::link::Game::gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Game.gamers.unlink() instead.
        "::unlink::Game::gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Game.gamers.exists() instead.
        "::exists::Game::gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Game.gamers() instead.
        "::get::Game::gamers": {
          isArray: true,
          url: urlBase + "/games/:id/gamers",
          method: "GET"
        },

        // INTERNAL. Use Game.gamers.create() instead.
        "::create::Game::gamers": {
          url: urlBase + "/games/:id/gamers",
          method: "POST"
        },

        // INTERNAL. Use Game.gamers.createMany() instead.
        "::createMany::Game::gamers": {
          isArray: true,
          url: urlBase + "/games/:id/gamers",
          method: "POST"
        },

        // INTERNAL. Use Game.gamers.destroyAll() instead.
        "::delete::Game::gamers": {
          url: urlBase + "/games/:id/gamers",
          method: "DELETE"
        },

        // INTERNAL. Use Game.gamers.count() instead.
        "::count::Game::gamers": {
          url: urlBase + "/games/:id/gamers/count",
          method: "GET"
        },

        // INTERNAL. Use Voiplog.gamer() instead.
        "::get::Voiplog::gamer": {
          url: urlBase + "/voiplogs/:id/gamer",
          method: "GET"
        },

        // INTERNAL. Use Gamelog.gamer() instead.
        "::get::Gamelog::gamer": {
          url: urlBase + "/gameplogs/:id/gamer",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Gamer#updateOrCreate
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Gamer#update
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Gamer#destroyById
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Gamer#removeById
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Gamer#modelName
    * @propertyOf lbServices.Gamer
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Gamer`.
    */
    R.modelName = "Gamer";

    /**
     * @ngdoc object
     * @name lbServices.Gamer.voiplogs
     * @header lbServices.Gamer.voiplogs
     * @object
     * @description
     *
     * The object `Gamer.voiplogs` groups methods
     * manipulating `Voiplog` instances related to `Gamer`.
     *
     * Call {@link lbServices.Gamer#voiplogs Gamer.voiplogs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Gamer#voiplogs
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Queries voiplogs of Gamer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R.voiplogs = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::get::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#count
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Counts voiplogs of Gamer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.voiplogs.count = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::count::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#create
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Creates a new instance in voiplogs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R.voiplogs.create = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::create::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#createMany
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Creates a new instance in voiplogs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R.voiplogs.createMany = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::createMany::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#destroyAll
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Deletes all voiplogs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.voiplogs.destroyAll = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::delete::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#destroyById
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Delete a related item by id for voiplogs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for voiplogs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.voiplogs.destroyById = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::destroyById::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#findById
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Find a related item by id for voiplogs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for voiplogs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R.voiplogs.findById = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::findById::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.voiplogs#updateById
         * @methodOf lbServices.Gamer.voiplogs
         *
         * @description
         *
         * Update a related item by id for voiplogs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for voiplogs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R.voiplogs.updateById = function() {
          var TargetResource = $injector.get("Voiplog");
          var action = TargetResource["::updateById::Gamer::voiplogs"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Gamer.games
     * @header lbServices.Gamer.games
     * @object
     * @description
     *
     * The object `Gamer.games` groups methods
     * manipulating `Game` instances related to `Gamer`.
     *
     * Call {@link lbServices.Gamer#games Gamer.games()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Gamer#games
         * @methodOf lbServices.Gamer
         *
         * @description
         *
         * Queries games of Gamer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::get::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#count
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Counts games of Gamer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.games.count = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::count::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#create
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Creates a new instance in games of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games.create = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::create::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#createMany
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Creates a new instance in games of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games.createMany = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::createMany::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#destroyAll
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Deletes all games of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.games.destroyAll = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::delete::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#destroyById
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Delete a related item by id for games.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for games
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.games.destroyById = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::destroyById::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#exists
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Check the existence of games relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for games
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games.exists = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::exists::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#findById
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Find a related item by id for games.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for games
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games.findById = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::findById::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#link
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Add a related item by id for games.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for games
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games.link = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::link::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#unlink
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Remove the games relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for games
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.games.unlink = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::unlink::Gamer::games"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamer.games#updateById
         * @methodOf lbServices.Gamer.games
         *
         * @description
         *
         * Update a related item by id for games.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for games
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.games.updateById = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::updateById::Gamer::games"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Game
 * @header lbServices.Game
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Game` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Game",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/games/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Game.gamers.findById() instead.
        "prototype$__findById__gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/:fk",
          method: "GET"
        },

        // INTERNAL. Use Game.gamers.destroyById() instead.
        "prototype$__destroyById__gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Game.gamers.updateById() instead.
        "prototype$__updateById__gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Game.gamers.link() instead.
        "prototype$__link__gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Game.gamers.unlink() instead.
        "prototype$__unlink__gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Game.gamers.exists() instead.
        "prototype$__exists__gamers": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/games/:id/gamers/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Game.gamers() instead.
        "prototype$__get__gamers": {
          isArray: true,
          url: urlBase + "/games/:id/gamers",
          method: "GET"
        },

        // INTERNAL. Use Game.gamers.create() instead.
        "prototype$__create__gamers": {
          url: urlBase + "/games/:id/gamers",
          method: "POST"
        },

        // INTERNAL. Use Game.gamers.destroyAll() instead.
        "prototype$__delete__gamers": {
          url: urlBase + "/games/:id/gamers",
          method: "DELETE"
        },

        // INTERNAL. Use Game.gamers.count() instead.
        "prototype$__count__gamers": {
          url: urlBase + "/games/:id/gamers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#create
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/games",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#createMany
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/games",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#upsert
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/games",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#exists
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/games/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#findById
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/games/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#find
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/games",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#findOne
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/games/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#updateAll
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/games/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#deleteById
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/games/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#count
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/games/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#prototype$updateAttributes
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/games/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Game#createChangeStream
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/games/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Gamer.games.findById() instead.
        "::findById::Gamer::games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/:fk",
          method: "GET"
        },

        // INTERNAL. Use Gamer.games.destroyById() instead.
        "::destroyById::Gamer::games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.games.updateById() instead.
        "::updateById::Gamer::games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Gamer.games.link() instead.
        "::link::Gamer::games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Gamer.games.unlink() instead.
        "::unlink::Gamer::games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.games.exists() instead.
        "::exists::Gamer::games": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/games/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Gamer.games() instead.
        "::get::Gamer::games": {
          isArray: true,
          url: urlBase + "/gamers/:id/games",
          method: "GET"
        },

        // INTERNAL. Use Gamer.games.create() instead.
        "::create::Gamer::games": {
          url: urlBase + "/gamers/:id/games",
          method: "POST"
        },

        // INTERNAL. Use Gamer.games.createMany() instead.
        "::createMany::Gamer::games": {
          isArray: true,
          url: urlBase + "/gamers/:id/games",
          method: "POST"
        },

        // INTERNAL. Use Gamer.games.destroyAll() instead.
        "::delete::Gamer::games": {
          url: urlBase + "/gamers/:id/games",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.games.count() instead.
        "::count::Gamer::games": {
          url: urlBase + "/gamers/:id/games/count",
          method: "GET"
        },

        // INTERNAL. Use Gamelog.game() instead.
        "::get::Gamelog::game": {
          url: urlBase + "/gameplogs/:id/game",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Game#updateOrCreate
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Game#update
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Game#destroyById
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Game#removeById
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Game#modelName
    * @propertyOf lbServices.Game
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Game`.
    */
    R.modelName = "Game";

    /**
     * @ngdoc object
     * @name lbServices.Game.gamers
     * @header lbServices.Game.gamers
     * @object
     * @description
     *
     * The object `Game.gamers` groups methods
     * manipulating `Gamer` instances related to `Game`.
     *
     * Call {@link lbServices.Game#gamers Game.gamers()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Game#gamers
         * @methodOf lbServices.Game
         *
         * @description
         *
         * Queries gamers of Game.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::get::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#count
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Counts gamers of Game.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.gamers.count = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::count::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#create
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Creates a new instance in gamers of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers.create = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::create::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#createMany
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Creates a new instance in gamers of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers.createMany = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::createMany::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#destroyAll
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Deletes all gamers of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.gamers.destroyAll = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::delete::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#destroyById
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Delete a related item by id for gamers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for gamers
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.gamers.destroyById = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::destroyById::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#exists
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Check the existence of gamers relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for gamers
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers.exists = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::exists::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#findById
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Find a related item by id for gamers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for gamers
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers.findById = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::findById::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#link
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Add a related item by id for gamers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for gamers
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers.link = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::link::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#unlink
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Remove the gamers relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for gamers
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.gamers.unlink = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::unlink::Game::gamers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Game.gamers#updateById
         * @methodOf lbServices.Game.gamers
         *
         * @description
         *
         * Update a related item by id for gamers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for gamers
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamers.updateById = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::updateById::Game::gamers"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Voiplog
 * @header lbServices.Voiplog
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Voiplog` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Voiplog",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/voiplogs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Voiplog.gamer() instead.
        "prototype$__get__gamer": {
          url: urlBase + "/voiplogs/:id/gamer",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#create
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/voiplogs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#createMany
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/voiplogs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#upsert
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/voiplogs",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#exists
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/voiplogs/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#findById
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/voiplogs/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#find
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/voiplogs",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#findOne
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/voiplogs/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#updateAll
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/voiplogs/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#deleteById
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/voiplogs/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#count
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/voiplogs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#prototype$updateAttributes
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/voiplogs/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#createChangeStream
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/voiplogs/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Gamer.voiplogs.findById() instead.
        "::findById::Gamer::voiplogs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/voiplogs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Gamer.voiplogs.destroyById() instead.
        "::destroyById::Gamer::voiplogs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/voiplogs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.voiplogs.updateById() instead.
        "::updateById::Gamer::voiplogs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/gamers/:id/voiplogs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Gamer.voiplogs() instead.
        "::get::Gamer::voiplogs": {
          isArray: true,
          url: urlBase + "/gamers/:id/voiplogs",
          method: "GET"
        },

        // INTERNAL. Use Gamer.voiplogs.create() instead.
        "::create::Gamer::voiplogs": {
          url: urlBase + "/gamers/:id/voiplogs",
          method: "POST"
        },

        // INTERNAL. Use Gamer.voiplogs.createMany() instead.
        "::createMany::Gamer::voiplogs": {
          isArray: true,
          url: urlBase + "/gamers/:id/voiplogs",
          method: "POST"
        },

        // INTERNAL. Use Gamer.voiplogs.destroyAll() instead.
        "::delete::Gamer::voiplogs": {
          url: urlBase + "/gamers/:id/voiplogs",
          method: "DELETE"
        },

        // INTERNAL. Use Gamer.voiplogs.count() instead.
        "::count::Gamer::voiplogs": {
          url: urlBase + "/gamers/:id/voiplogs/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Voiplog#updateOrCreate
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#update
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#destroyById
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Voiplog#removeById
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Voiplog` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Voiplog#modelName
    * @propertyOf lbServices.Voiplog
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Voiplog`.
    */
    R.modelName = "Voiplog";


        /**
         * @ngdoc method
         * @name lbServices.Voiplog#gamer
         * @methodOf lbServices.Voiplog
         *
         * @description
         *
         * Fetches belongsTo relation gamer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamer = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::get::Voiplog::gamer"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Gamelog
 * @header lbServices.Gamelog
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Gamelog` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Gamelog",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/gameplogs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Gamelog.game() instead.
        "prototype$__get__game": {
          url: urlBase + "/gameplogs/:id/game",
          method: "GET"
        },

        // INTERNAL. Use Gamelog.gamer() instead.
        "prototype$__get__gamer": {
          url: urlBase + "/gameplogs/:id/gamer",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#create
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/gameplogs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#createMany
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/gameplogs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#upsert
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/gameplogs",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#exists
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/gameplogs/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#findById
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/gameplogs/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#find
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/gameplogs",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#findOne
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/gameplogs/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#updateAll
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/gameplogs/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#deleteById
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/gameplogs/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#count
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/gameplogs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#prototype$updateAttributes
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/gameplogs/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#createChangeStream
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/gameplogs/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Gamelog#updateOrCreate
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#update
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#destroyById
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#removeById
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamelog` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Gamelog#modelName
    * @propertyOf lbServices.Gamelog
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Gamelog`.
    */
    R.modelName = "Gamelog";


        /**
         * @ngdoc method
         * @name lbServices.Gamelog#game
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Fetches belongsTo relation game.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Game` object.)
         * </em>
         */
        R.game = function() {
          var TargetResource = $injector.get("Game");
          var action = TargetResource["::get::Gamelog::game"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gamelog#gamer
         * @methodOf lbServices.Gamelog
         *
         * @description
         *
         * Fetches belongsTo relation gamer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gamer` object.)
         * </em>
         */
        R.gamer = function() {
          var TargetResource = $injector.get("Gamer");
          var action = TargetResource["::get::Gamelog::gamer"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch(err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
