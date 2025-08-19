# frozen_string_literal: true

module BlacklightRangeLimit
  class RangeFacetComponent < Blacklight::Component
    renders_one :more_link, ->(key:, label:) do
      tag.div class: 'more_facets' do
        link_to t('blacklight.range_limit.view_larger', field_name: label),
          search_facet_path(id: key),
          data: { blacklight_modal: 'trigger' }
      end
    end

    delegate :search_action_path, :search_facet_path, to: :helpers

    def initialize(facet_field:, layout: nil, classes: BlacklightRangeLimit.classes)
      @facet_field = facet_field
      @layout = layout == false ? Blacklight::FacetFieldNoLayoutComponent : Blacklight::FacetFieldComponent
      @classes = classes
    end

    # THIS IS FROM COMMIT FOR 9.0
    # https://github.com/projectblacklight/blacklight_range_limit/commit/ca32be1b0114d92ee847b9e9e6564d38dfcee2ca#diff-d4d0744e418711e4563b39d85b8ebad1816f3ef73211dad2ba9e27b09ab705a6

    # Don't render if we have no values at all -- most commonly on a zero results page.
    # Normally we'll have at least a min and a max (of values in result set, solr returns),
    # OR a count of objects missing a value -- if we don't have ANY of that, there is literally
    # nothing we can display, and we're probably in a zero results situation.
    def render?
      (@facet_field.min.present? && @facet_field.max.present?) ||
        @facet_field.missing_facet_item.present? && @facet_field.missing_facet_item.value != { missing: true }
    end

    def range_config
      @facet_field.range_config
    end

    def range_limit_url(options = {})
      helpers.main_app.url_for(@facet_field.search_state.to_h.merge(range_field: @facet_field.key, action: 'range_limit').merge(options))
    end
  end
end
