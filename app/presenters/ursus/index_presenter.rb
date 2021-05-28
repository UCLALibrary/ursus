# frozen_string_literal: true
module Ursus
  class IndexPresenter < Blacklight::IndexPresenter
    self.thumbnail_presenter = Ursus::ThumbnailPresenter
  end
end
