# frozen_string_literal: true

class SearchFieldService
  include Singleton

  SEARCH_FIELDS = [
    ::Solrizer.solr_name('alternative_title', :stored_searchable),
    ::Solrizer.solr_name('architect', :stored_searchable),
    'author_tesim',
    ::Solrizer.solr_name('binding_note', :stored_sortable),
    ::Solrizer.solr_name('caption', :stored_searchable),
    'collation_tesim',
    'colophon_tesim',
    'composer_tesim',
    'condition_note_tesim',
    'contents_note_tesim',
    ::Solrizer.solr_name('contributor', :stored_searchable),
    ::Solrizer.solr_name('creator', :stored_searchable),
    ::Solrizer.solr_name('description', :stored_searchable),
    'explicit_tesim',
    'features_tesim',
    'foliation_tesim',
    ::Solrizer.solr_name('genre', :stored_searchable),
    ::Solrizer.solr_name('identifier', :stored_searchable),
    'illuminator_tesim',
    'illustrations_note_tesim',
    'inscription_tesim',
    'incipit _tesim',
    'local_identifier_ssm',
    ::Solrizer.solr_name('location', :stored_searchable),
    'lyricist_tesim',
    ::Solrizer.solr_name('medium', :stored_searchable),
    ::Solrizer.solr_name('named_subject', :stored_searchable),
    ::Solrizer.solr_name('normalized_date', :stored_searchable),
    'page_layout_ssim',
    ::Solrizer.solr_name('photographer', :stored_searchable),
    ::Solrizer.solr_name('place_of_origin', :stored_searchable),
    'provenance_tesim',
    ::Solrizer.solr_name('publisher', :stored_searchable),
    'scribe_tesim',
    'script_tesim',
    ::Solrizer.solr_name('subject', :stored_searchable),
    'subject_topic_tesim',
    ::Solrizer.solr_name('summary', :stored_searchable),
    ::Solrizer.solr_name('title', :stored_searchable),
    'toc_tesim',
    'writing_and_hands_tesim',
    'writing_system_tesim',
    ::Solrizer.solr_name('uniform_title', :stored_searchable),
    'ark_ssi'
  ].join(' ').freeze
  def search_fields
    SEARCH_FIELDS
  end
end
