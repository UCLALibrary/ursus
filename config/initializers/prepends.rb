# frozen_string_literal: true
CatalogHelper.send(:prepend, Blacklight::FacetLabelButtonBehavior)
Blacklight::ThumbnailPresenter.send(:prepend, Ursus::ThumbnailPresenter)
Blacklight::BlacklightHelperBehavior.send(:prepend, Blacklight::UrsusLayoutHelperBehavior)
