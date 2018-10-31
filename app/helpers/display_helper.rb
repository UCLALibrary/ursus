require 'uri'


module DisplayHelper

  def values_with_line_breaks(args)
    safe_join(Array.wrap(args[:value]), '<br />'.html_safe)
  end

  def values_with_line_breaks_and_facet_links(args)
    values_html = Array.wrap(args[:value]).map{|v| "<a href='/catalog?f%5Bgenre_sim%5D%5B%5D=#{URI.encode_www_form_component(v)}' class='genre'>#{v}</a>".html_safe}
    safe_join(values_html, '<br />'.html_safe)
  end

end
