# frozen_string_literal: true
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # TODO: This method should correctly render methods other than CC-BY 4.0 and
  # be able to distinguish between them.
  def render_license(_args = {})
    return '' unless @document
    return '' unless @document[:license_tesim]

    license = @document[:license_tesim].first

    if license.match?(/creativecommons.org/)
      license_data = Ursus::LicenseMetadataPresenter.new(document: @document).data
      return license unless license_data

      data = license_markup(license_data)
      data.html_safe
    else
      license
    end
  end

  def license_markup(license_data)
    %( <a rel="license" href="#{license_data['id']}">
      <img alt="#{license_data['term']}" style="border-width:0; width:120px"
      src="#{license_data['image']}" />
      </a>This work is licensed under a
      <a rel="license"
      href="#{license_data['id']}">
      "#{license_data['term']}"
      </a>. )
  end

  def schema_org_markup
    if controller.controller_name == 'catalog' && @document && @document[:has_model_ssim]
      schema_org_attributes = "itemscope itemid='#{request.base_url + solr_document_path(@document.id)}'"
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

  def render_finding_aid_link
    finding_aid_link = @document[:finding_aid_url_ssm]
    finding_aid_html = '<a href="' + finding_aid_link[0].to_s + '">' + finding_aid_link[0].to_s + '</a>'
    finding_aid_html.html_safe
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

  # def render_related_to_markup
  #   related_to_text = ''
  #   urls = @document[:related_to_ssm]
  #   urls.each { |url| related_to_text += '<a href="' + url + '">' + url + '</a> <br>' }
  #   related_to_text
  # end

  # def render_related_to_link
  #   data = render_related_to_markup
  #   data.html_safe
  # end

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

  def render_truncated_list(field_values)
    trunc = "<div class='metadata-value-index--sinai'>"
    trunc += field_values[0..2].join("&nbsp;|&nbsp;")
    trunc += "&nbsp;|&nbsp;..." if field_values.length > 3
    trunc += "</div>"
    trunc.html_safe
  end
end
