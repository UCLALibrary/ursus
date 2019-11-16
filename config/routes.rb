# frozen_string_literal: true
Rails.application.routes.draw do
  mount Flipflop::Engine => "/flipflop"
  get '/about', to: 'static#about'
  get '/copyrights_and_collections', to: 'static#copyright'
  get '/privacy_policy', to: 'static#privacy'
  get '/contact', to: 'static#contact'
  get '/migration_updates', to: 'static#migration_updates'
  get '/static', to: 'static#static_pages'

  concern :range_searchable, BlacklightRangeLimit::Routes::RangeSearchable.new
  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog' do
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
