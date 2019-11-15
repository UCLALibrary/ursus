// Master manifest file for engine, so local app can require
// this one file, but get all our files -- and local app
// require does not need to change if we change file list.
//
// Note JQuery is required to be loaded for flot and blacklight_range_limit
// JS to work, expect host app to load it.


//= require 'flot/jquery.flot.js'
//= require 'flot/jquery.flot.selection.js'
//= require 'bootstrap-slider'

//= require_tree './blacklight_range_limit'
