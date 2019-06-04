# frozen_string_literal: true

FIRST_WORK = {
  id: '123',
  ark_ssi: ['ark:/24920492/029402'],
  has_model_ssim: ['Work'],
  title_tesim: ['The Title of my Work'],
  description_tesim: ['Description 1', 'Description 2'],
  subject_tesim: ['Subj 1', 'Subj 2'],
  human_readable_resource_type_tesim: ['still image'],
  human_readable_rights_statement_tesim: ['copyrighted'],
  genre_tesim: ['Genre 1', 'Genre 2', 'Genre 3'],
  named_subject_tesim: ["Named Subject 1", "Named Subject 2", "Named Subject 3", "Named Subject 4"],
  repository_tesim: ['University of California, Los Angeles. Library. Department of Special Collections'],
  location_tesim: ['Los Angeles'],
  publisher_tesim: ['Los Angeles Daily News'],
  rights_country_tesim: ['US'],
  rights_holder_tesim: ['Charles E. Young'],
  normalized_date_sim: ['1934-56-78'], # unique value so we can test it doesn't display
  local_identifier_ssm: ['local id 123'],
  date_created_tesim: ["September 17, 1947"],
  medium_tesim: ['1 photograph'],
  extent_tesim: ['1 photograph'],
  dimensions_tesim: ['10 x 12.5 cm.'],
  funding_note_tesim: ['Info about funding'],
  caption_tesim: ['the caption'],
  human_readable_language_tesim: ['No linguistic content'],
  photographer_tesim: ['Poalillo, Charles'],
  member_of_collections_ssim: ['Photographic Collection'],
  license_tesim: ['https://creativecommons.org/licenses/by/4.0/'],
  services_contact_ssm: ['UCLA Special Collections Services Contact'],

  longitude_tesim: ['-118.4398'],
  latitude_tesim: ['34.0700'],
  alternative_title_tesim: ['Alernative Title of my Work'],
  uniform_title_tesim: ['Uniform Title of my Work'],
  architect_tesim: ['Alexander Butterfly'],
  # year_isim: ['1974'],
  place_of_origin_tesim: ['Dudley, MA'],
  oclc_tesim_ssi: ['Powell Library'],
  format_tesim: ['Film Still'],
  support_tesim: ['Mom & Dad']
}.freeze

SECOND_WORK = {
  id: 'id123',
  has_model_ssim: ['Work'],
  title_tesim: ['Title One'],
  identifier_tesim: ['ark 123'],
  description_tesim: ['Description 1', 'Description 2'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1923,
  human_readable_resource_type_tesim: ['still image'],
  subject_tesim: ['Testing', 'RSpec'],
  photographer_tesim: ['Person 1', 'Person 2'],
  location_tesim: ['search_results_spec'], # to control what displays,
  thumbnail_path_ss: ["/assets/work-ff055336041c3f7d310ad69109eda4a887b16ec501f35afc0a547c4adb97ee72.png"],
  member_of_collection_ids_ssim: ['coll123']
}.freeze

THIRD_WORK = {
  id: 'id456',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Two'],
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1945,
  human_readable_resource_type_tesim: ['still image'],
  subject_tesim: ['Testing', 'Minitest'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  collection_tesim: ['Slide Film', 'Analog', 'Photographs'],
  member_of_collections_ssim: ['Photographic Collection'],
  member_of_collection_ids_ssim: ['coll123']
}.freeze

FIRST_COLLECTION = {
  id: 'coll123',
  services_contact_ssm: ['someone somewhere'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  repository_tesim: ['UCLA Collection'],
  languages_tesim: ['English', 'Spanish', 'Greek']
}.freeze

FOURTH_WORK = {
  id: 'id456',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  collection_tesim: ['Photographs', 'Digital']
}.freeze
