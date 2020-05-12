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
      data.html_safe
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

  def schema_org_markup
    if controller.controller_name == 'catalog' && @document && @document[:has_model_ssim]
      schema_org_attributes = "itemscope itemid='#{request.base_url + solr_document_path(@document.id.to_s.parameterize)}'"
      if @document[:has_model_ssim][0] == 'Collection'
        schema_org_attributes += ' itemtype="http://schema.org/Collection"'
      elsif @document[:has_model_ssim][0] == 'Work'
        schema_org_attributes += ' itemtype="http://schema.org/CreativeWork"'
      end
      schema_org_attributes.html_safe
    end
  end

  def render_opac_link
    opac_link = @document[:opac_url_ssi]
    return unless opac_link
    opac_link = "<dt class = 'item-label col-12 col-sm-4 item-label'>Opac url</dt><dd class = 'item-value col-12 col-sm-8 item-value'><a href = '" + opac_link + "'>" + opac_link + "</a></dd>"
    opac_link.html_safe
  end

  def render_iiif_manifest_link
    iiif_manifest = @document[:iiif_manifest_url_ssi]
    return unless iiif_manifest
    iiif_manifest = "<dt class = 'item-label col-12 col-sm-4 item-label'>Manifest url</dt><dd class = 'item-value col-12 col-sm-8 item-value'><a href = '" + iiif_manifest + "'>" + iiif_manifest + "</a></dd>"
    iiif_manifest.html_safe
  end
end
