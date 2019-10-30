# frozen_string_literal: true
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # TODO: This method should correctly render methods other than CC-BY 4.0 and
  # be able to distinguish between them.
  def render_license
    return 'No license recorded' unless @document
    return 'No license recorded' unless @document[:license_tesim]
    license = @document[:license_tesim].first
    if license.match?(/creativecommons.org/)
      data = license_markup
      data.html_safe # rubocop:disable Rails/OutputSafety
    else
      license
    end
  end

  def license_markup
    %( <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
      <img alt="Creative Commons License" style="border-width:0"
      src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
      </a><br />This work is licensed under a
      <a rel="license"
      href="http://creativecommons.org/licenses/by/4.0/">
      Creative Commons Attribution 4.0 International License
      </a>. )
  end

  def render_body_class
    # Overrides this method in 
    # /projectblacklight/blacklight/app/helpers/blacklight/blacklight_helper_behavior.rb
    # Gives more fine-tuned control over CSS & JS selectors (esp for GA event tracking)
    body_class = extra_body_classes.join " "
    if controller.is_a? Blacklight::Catalog and has_search_parameters?
      body_class << ' search-results-page'
    end
    body_class << ' ' + controller.action_name
    body_class
  end
end
