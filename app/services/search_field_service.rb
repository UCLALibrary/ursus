# frozen_string_literal: true

class SearchFieldService
  include Singleton

  SEARCH_FIELDS = 'title_tesim subject_tesim named_subject_tesim location_tesim description_tesim caption_tesim identifier_tesim local_identifier_tesim normalized_date_tesim photographer_tesim'.freeze
  def search_fields
    SEARCH_FIELDS
  end
end
