# frozen_string_literal: true

FIRST_WORK = {
  id: '204920-29402942',
  ark_ssi: 'ark:/24920492/029402',
  has_model_ssim: ['Work'],
  title_tesim: ['The Title of my Work'],
  sort_title_ssort: 'The Title of my Work',
  title_alpha_numeric_ssort: 'The Title 1 of my Work',
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
  local_identifier_ssim: ['local id 123'],
  date_created_tesim: ["September 17, 1947"],
  medium_tesim: ['1 photograph'],
  extent_tesim: ['1 photograph'],
  dimensions_tesim: ['10 x 12.5 cm.'],
  funding_note_tesim: ['Info about funding'],
  caption_tesim: ['the caption'],
  human_readable_language_tesim: ['No linguistic content'],
  photographer_tesim: ['Poalillo, Charles'],
  license_tesim: ['https://creativecommons.org/licenses/by/4.0/'],
  services_contact_ssm: ['UCLA Special Collections Services Contact'],
  longitude_tesim: ['-118.4398'],
  latitude_tesim: ['34.0700'],
  member_of_collections_ssim: ['Hathaway Manuscripts', 'Allan (Maud) Papers. Collection 2038', 'E.F. Raynes Plante Autograph Albums (1914-1918)', 'Photographic Collection'],
  member_of_collection_ids_ssim: ['9qsg9000zz-89112', 'ps4gn100zz-89112', 'k13t1n-89112', 'jdpmdc-89112'],
  alternative_title_tesim: ['Alernative Title of my Work'],
  uniform_title_tesim: ['Uniform Title of my Work'],
  architect_tesim: ['Alexander Butterfly'],
  # year_isim: ['1974'],
  place_of_origin_tesim: ['Dudley, MA'],
  oclc_ssi: ['Powell Library'],
  format_tesim: ['Film Still'],
  support_tesim: ['Mom & Dad'],
  read_access_group_ssim: ["public"],
  thumbnail_url_ss: ["http://thumbnail/work1.jpg"],
  visibility_ssi: ['open']
}.freeze

SECOND_WORK = {
  id: 'id-123',
  ark_ssi: 'ark:/321/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title One'],
  sort_title_ssort: 'Title One',
  title_alpha_numeric_ssort: 'The Title 2 of my Work',
  identifier_tesim: ['ark 123'],
  description_tesim: ['Description 1', 'Description 2'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1923,
  human_readable_resource_type_tesim: ['still image'],
  subject_tesim: ['Testing', 'RSpec'],
  photographer_tesim: ['Person 1', 'Person 2'],
  place_of_origin_tesim: ['Boston, MA', 'Philadelphia, PA', 'New York, NY', 'Los Angeles, CA'],
  location_tesim: ['search_results_spec'], # to control what displays,
  member_of_collection_ids_ssim: ['coll-123'],
  read_access_group_ssim: ["public"],
  thumbnail_url_ss: ["http://thumbnail/work2.jpg"],
  visibility_ssi: ['open']
}.freeze

THIRD_WORK = {
  id: 'id-456',
  ark_ssi: 'ark:/654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Two'],
  sort_title_ssort: 'Title Two',
  title_alpha_numeric_ssort: 'The Title 10 of my Work',
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
  member_of_collection_ids_ssim: ['coll-123'],
  read_access_group_ssim: ["public"],
  thumbnail_url_ss: ["http://thumbnail/work3.jpg"],
  visibility_ssi: ['open']
}.freeze

FIRST_COLLECTION = {
  id: 'coll-123',
  ark_ssi: 'ark:/321/lloc',
  services_contact_ssm: ['someone somewhere'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  repository_tesim: ['UCLA Collection'],
  languages_tesim: ['en', 'es', 'gk'],
  human_readable_language_tesim: ['English', 'Spanish', 'Greek']
}.freeze

FOURTH_WORK = {
  id: 'id-456',
  ark_ssi: 'ark:/654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  sort_title_ssort: 'Title Three',
  title_alpha_numeric_ssort: 'The Title 100 of my Work',
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  extent_tesim: ['1 photograph'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  collection_tesim: ['Photographs', 'Digital'],
  thumbnail_url_ss: ["http://thumbnail/work4.jpg"],
  visibility_ssi: ['open']
}.freeze

WORK_A = {
  id: 'id-456a',
  ark_ssi: 'ark:/a654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  sort_title_ssort: 'Title Three',
  title_alpha_numeric_ssort: 'The Title 100 of my Work',
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  member_of_collections_ssim: ['Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'],
  member_of_collection_ids_ssim: ['m8f11000zz-89112'],
  thumbnail_url_ss: ["http://thumbnail/work4.jpg"],
  visibility_ssi: ['open']
}.freeze

WORK_B = {
  id: 'id-456b',
  ark_ssi: 'ark:/b654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  sort_title_ssort: 'Title Three',
  title_alpha_numeric_ssort: 'The Title 100 of my Work',
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  member_of_collections_ssim: ['Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'],
  member_of_collection_ids_ssim: ['m8f11000zz-89112'],
  thumbnail_url_ss: ["http://thumbnail/work4.jpg"],
  visibility_ssi: ['open']
}.freeze

WORK_C = {
  id: 'id-456c',
  ark_ssi: 'ark:/c654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  sort_title_ssort: 'Title Three',
  title_alpha_numeric_ssort: 'The Title 100 of my Work',
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  member_of_collections_ssim: ['Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'],
  member_of_collection_ids_ssim: ['m8f11000zz-89112'],
  thumbnail_url_ss: ["http://thumbnail/work4.jpg"],
  visibility_ssi: ['open']
}.freeze

WORK_D = {
  id: 'id-456d',
  ark_ssi: 'ark:/d654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  sort_title_ssort: 'Title Three',
  title_alpha_numeric_ssort: 'The Title 100 of my Work',
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  member_of_collections_ssim: ['Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'],
  member_of_collection_ids_ssim: ['m8f11000zz-89112'],
  thumbnail_url_ss: ["http://thumbnail/work4.jpg"],
  visibility_ssi: ['open']
}.freeze

WORK_E = {
  id: 'id456e',
  ark_ssi: 'ark:/e654/di',
  has_model_ssim: ['Work'],
  title_tesim: ['Title Three'],
  sort_title_ssort: 'Title Three',
  title_alpha_numeric_ssort: 'The Title 100 of my Work',
  identifier_tesim: ['ark 456'],
  description_tesim: ['Description 3', 'Description 4', 'another desc'],
  date_created_tesim: ["Date 1"],
  sort_year_isi: 1929,
  human_readable_resource_type_tesim: ['still image'],
  photographer_tesim: ['Person 1'],
  location_tesim: ['search_results_spec'], # to control what displays
  member_of_collections_ssim: ['Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'],
  member_of_collection_ids_ssim: ['m8f11000zz-89112'],
  thumbnail_url_ss: ["http://thumbnail/work4.jpg"],
  visibility_ssi: ['open']
}.freeze
