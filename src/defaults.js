"use strict";
var $ = require("jquery");
module.exports = {
  /**
	 * key of default plugin to use
	 * @property output
	 * @type string
	 * @default "table"
	 */
  output: "table",
  useGoogleCharts: true,
  outputPlugins: ["table", "error", "boolean", "rawResponse", "pivot", "gchart", "leaflet"],

  /**
	 * Draw the output selector widget
	 *
	 * @property drawOutputSelector
	 * @type boolean
	 * @default true
	 */
  drawOutputSelector: true,

  /**
	 * Draw download icon. This issues html5 download functionality to 'download' files created on the client-side.
	 *  This allows the user to download results already queried for, such as a CSV when a table is shown, or the original response when the raw response output is selected
	 *
	 * @property drawDownloadIcon
	 * @type boolean
	 * @default true
	 */
  drawDownloadIcon: true,
  /**
	 * Open links (anchor tags) of SPARQL results in a new browser tab/window (_blank), or the current one (_self)
	 *
	 * @property uriTarget
	 * @type string ('_blank' | '_self')
	 * @default '_blank'
	 */
  uriTarget: "_blank",
  onQuotaExceeded: function(e) {
    //fail silently
    console.warn("Could not store in localstorage. Skipping..", e);
  },
  getUsedPrefixes: null,
  /**
	 * Make certain settings and values of YASR persistent. Setting a key
	 * to null, will disable persistancy: nothing is stored between browser
	 * sessions Setting the values to a string (or a function which returns a
	 * string), will store the query in localstorage using the specified string.
	 * By default, the ID is dynamically generated by finding the nearest DOM element with an "id" set,
	 * to avoid collissions when using multiple YASR items on one page
	 *
	 * @property persistency
	 * @type object
	 */
  persistency: {
    prefix: function(yasr) {
      return "yasr_" + $(yasr.container).closest("[id]").attr("id") + "_";
    },
    /**
		 * Persistency setting for the selected output
		 *
		 * @property persistency.outputSelector
		 * @type string|function
		 * @default function (determine unique id)
		 */
    outputSelector: function(yasr) {
      return "selector";
    },
    /**
		 * Persistency setting for query results.
		 *
		 * @property persistency.results
		 * @type object
		 */
    results: {
      /**
			 * Get the key to store results in
			 *
			 * @property persistency.results.id
			 * @type string|function
			 * @default function (determine unique id)
			 */
      id: function(yasr) {
        return "results_" + $(yasr.container).closest("[id]").attr("id");
      },
      key: "results",
      /**
			 * The result set might too large to fit in local storage.
			 * It is impossible to detect how large the local storage is.
			 * Therefore, we do not store all results in local storage, depending on a max number of characters in the SPARQL result serialization.
			 * Set this function conservitavely. (especially when using multiple YASR instances on one page)
			 *
			 * @property persistency.results.maxSize
			 * @type int
			 * @default 100000
			 */
      maxSize: 100000 //char count
    }
  }
};
