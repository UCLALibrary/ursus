# frozen_string_literal: true

class ThumbnailUrlService
  # @param url [String] the URL you want to append to the thumbnail src tag
  # @param html [String] the html that contains the img tag
  def initialize(url:, html:)
    @url = url
    @html = html
  end

  # @return [String] HTML string with the URL appended
  def markup_with_full_url
    html_doc = Nokogiri::HTML(@html)
    img = html_doc.at_css 'img'
    img[:src] = @url + img[:src]
    html_doc.xpath('//body').to_html
  end
end
