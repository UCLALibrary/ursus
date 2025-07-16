# frozen_string_literal: true
class SearchHistoryController < ApplicationController
  include Blacklight::SearchHistory
  include BlacklightRangeLimit::ControllerOverride
end
