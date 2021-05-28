# frozen_string_literal: true
CatalogHelper.send(:prepend, Blacklight::FacetLabelButtonBehavior)
Blacklight::BlacklightHelperBehavior.send(:prepend, Blacklight::UrsusLayoutHelperBehavior)
