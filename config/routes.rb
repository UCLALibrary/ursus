# frozen_string_literal: true
Rails.application.routes.draw do
  concern :oai_provider, BlacklightOaiProvider::Routes.new

  mount Flipflop::Engine => "/flipflop"

  # Ursus static pages
  get '/copyrights_and_collections', to: 'static#ursus_copyright'
  get '/privacy_policy', to: 'static#ursus_privacy'
  get '/ursus_about', to: 'static#ursus_about'

  # Sinai static pages
  get '/login', to: 'login#new', as: 'login'
  get '/terms-of-use', to: 'static#sinai_terms_of_use'
  get '/sinai_about', to: 'static#sinai_about'
  get '/manuscript_descriptions', to: 'static#sinai_manuscript_descriptions'

  # Canon Law
  get '/canonlaw', to: 'canon_law#index'
  get '/canonlaw/introduction', to: 'canon_law#introduction'
  get '/canonlaw/table_of_contents', to: 'canon_law#table_of_contents'
  get '/canonlaw/margarita_decretalium', to: 'canon_law#margarita'
  get '/canonlaw/materiae_singulares', to: 'canon_law#materiae'

  get '/contact', to: 'static#contact'
  get '/version', to: 'static#version'

  concern :range_searchable, BlacklightRangeLimit::Routes::RangeSearchable.new
  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog' do
    concerns :oai_provider

    concerns :searchable
    concerns :range_searchable
  end

  devise_for :users
  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog' do
    concerns :exportable
  end

  resources :bookmarks do
    concerns :exportable

    collection do
      delete 'clear'
    end
  end

  mount Blacklight::Engine => '/'
  mount BlacklightDynamicSitemap::Engine => '/'

  root to: "catalog#index"
  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog' do
    concerns :exportable
  end

  resources :bookmarks do
    concerns :exportable

    collection do
      delete 'clear'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
