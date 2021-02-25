# frozen_string_literal: true
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # TODO: This method should correctly render methods other than CC-BY 4.0 and
  # be able to distinguish between them.
  def render_license
    return '' unless @document
    return '' unless @document[:license_tesim]
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
    opac_link = "<dt class = 'metadata-block__label-key'>Opac url</dt><dd class = 'metadata-block__label-value'><a href = '" + opac_link + "'>" + opac_link + "</a></dd>"
    opac_link.html_safe
  end

  def other_versions_markup
    other_versions_text = ''
    urls = @document[:other_versions_tesim]
    urls.each { |url| other_versions_text += '<a href="' + url + '">' + url + '</a> <br>' }
    other_versions_text
  end

  def render_other_versions_link
    data = other_versions_markup
    data.html_safe
  end

  def render_table_of_contents_key
    unless @document[:toc_tesim].nil? || @document[:toc_tesim].empty?
      'Table of contents'
    end
  end

  def render_table_of_contents_value
    unless @document[:toc_tesim].nil? || @document[:toc_tesim].empty?
      table_contents = @document[:toc_tesim]
      return unless table_contents
      table_contents[0]
    end
  end

  def render_truncated_list(d_presenter, sinai_index)
    if sinai_index.length.positive?
      sinai_index.each do |_field_name, field|
        trunc = "<div class='metadata-value-index--sinai'>"
        all_vals_array_truncated = (d_presenter.field_value field).split("&nbsp;|&nbsp;")[0..2]
        count = 1
        all_vals_array_truncated.each do |each_val|
          trunc += each_val
          trunc += " | " if count < all_vals_array_truncated.length
          count += 1
        end
        trunc += "&nbsp;|&nbsp;..." if (d_presenter.field_value field).split("&nbsp;|&nbsp;").length > all_vals_array_truncated.length
        return (trunc += "</div>").html_safe
      end
    end
  end
end
