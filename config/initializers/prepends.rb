# frozen_string_literal: true

Rails.application.config.to_prepare do
	Ursus::CatalogHelper.prepend(Blacklight::FacetLabelButtonBehavior)
	Blacklight::BlacklightHelperBehavior.prepend(Blacklight::UrsusLayoutHelperBehavior)
end
