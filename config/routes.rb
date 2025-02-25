# frozen_string_literal: true
Rails.application.routes.draw do
  concern :oai_provider, BlacklightOaiProvider::Routes.new

  mount Flipflop::Engine => "/flipflop"

  # Ursus static pages
  get '/ursus_about', to: 'static#ursus_about'
  get '/ursus_contact', to: 'static#ursus_contact'
  get '/copyright_and_collections', to: 'static#ursus_copyright'
  get '/privacy_policy', to: 'static#ursus_privacy'
  get '/iiif_guide', to: 'static#ursus_iiif_guide'

  get '/tomreed', to: 'catalog#show', id: 'ark:/21198/z1wq1vx1'
  get '/ktla', to: 'catalog#show', id: 'ark:/21198/z1032vqf'
  get '/reflecciones', to: 'catalog#show', id: 'ark:/21198/z1x98m6j'

  # Canon Law
  get '/canonlaw', to: 'canon_law#index'
  get '/canonlaw/introduction', to: 'canon_law#introduction'
  get '/canonlaw/table_of_contents', to: 'canon_law#table_of_contents'
  get '/canonlaw/margarita_decretalium', to: 'canon_law#margarita'
  get '/canonlaw/materiae_singulares', to: 'canon_law#materiae'

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

  resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog', constraints: { id: /(ark\:)?[\w\=\#\*\+\@\_\$\%\-\/]+/ } do
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

  match '*unmatched', to: 'errors#not_found', via: :all

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
