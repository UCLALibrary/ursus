module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # TODO This method should correctly render methods other than CC-BY 4.0 and
  # be able to distinguish between them.
  def render_license
    license = @document[:license_tesim].first
    if license.match(/creativecommons.org/)
      data = '<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
      <img alt="Creative Commons License" style="border-width:0"
      src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
      </a><br />This work is licensed under a
      <a rel="license"
      href="http://creativecommons.org/licenses/by/4.0/">
      Creative Commons Attribution 4.0 International License
      </a>.'
      data.html_safe
    else
      license
    end
  end
end
