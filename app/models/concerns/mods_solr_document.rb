# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength,Metrics/CyclomaticComplexity
module ModsSolrDocument
    extend ActiveSupport::Concern
  
    # rubocop:disable Metrics/BlockLength,Metrics/MethodLength,Metrics/PerceivedComplexity,Metrics/AbcSize/Metrics/
    def to_oai_mods
      builder = Nokogiri::XML::Builder.new do |xml|
        xml.mods('xmlns:mods' => 'http://www.loc.gov/mods/v3', 'version' => '3.8', 'xmlns:xlink' => 'http://www.w3.org/1999/xlink') do
          # xml['mods'].identifier({ type: 'ladybird' }, "oid#{self[:id]}")
          # xml['mods'].identifier({ displayLabel: 'Accession Number', type: 'local' }, self[:accessionNumber_ssi]) if self[:accessionNumber_ssi].present?
          # xml['mods'].identifier({ displayLabel: 'Barcode', type: 'local' }, self[:orbisBarcode_ssi]) if self[:orbisBarcode_ssi].present?
          xml['mods'].identifier({ type: 'local' }, self[:local_identifier_ssm]) if self[:local_identifier_ssm].present?
          self[:description_tesim]&.each { |abstract| xml['mods'].abstract abstract.to_s }
          self[:license_tesim]&.each { |access| xml['mods'].accessCondition( { type: "use and reproduction", displayLabel: "license" } ,access.to_s) }
          self[:local_rights_statement_ssim]&.each { |access| xml['mods'].accessCondition( { type: "local rights statements" } ,access.to_s) }
          self[:human_readable_rights_statement_tesim]&.each { |access| xml['mods'].accessCondition( { type: "use and reproduction", displayLabel: "rightsUri" } ,access.to_s) 
          self[:genre_tesim]&.each { |genre| xml['mods'].genre genre.to_s }
          self[:resp_statement_tesim]&.each { |note| xml['mods'].note({ type: 'statementofresponsibility', displayLabel: 'statementofresponsibility' }, note.to_s) }
          # self[:callNumber_ssim]&.each { |classification| xml['mods'].classification classification.to_s }
          # self[:repository_ssim]&.each { |note| xml['mods'].note({ type: 'preferred citation' }, note.to_s) }
          self[:citation_source_tesim]&.each { |note| xml['mods'].note({ type: 'references', displayLabel: 'references' }, note.to_s) }
          # xml['mods'].note({ displayLabel: 'number' }, self[:number_of_pages_ss]) if self[:number_of_pages_ss].present?
          # self[:extentOfDigitization_ssim]&.each { |note| xml['mods'].note({ displayLabel: 'Parts scanned' }, note.to_s) }
          # self[:digital_ssim]&.each { |note| xml['mods'].note({ displayLabel: 'Digital' }, note.to_s) }

          # not sure if we need to downcase maybe ucla field values are already lowercase
          if self[:human_readable_resource_type_tesim].present?
            self[:human_readable_resource_type_tesim].select { |format| valid_formats.any? { |f| f.include?(format.downcase) } }.each { |type_resource| xml['mods'].typeOfResource type_resource.to_s }
          end
          # self[:rights_ssim]&.each { |access_condition| xml['mods'].accessCondition({ type: 'restriction on access' }, access_condition.to_s) }
          if self[:human_readable_language_tesim] || self[:language_tesim]
            xml['mods'].language do
              self[:human_readable_language_tesim]&.each { |language| xml['mods'].languageTerm({ type: 'text' }, language.to_s) }
              self[:language_tesim]&.each { |language_code| xml['mods'].languageTerm({ type: 'code', authority: 'iso639-2b' }, language_code.to_s) }
            end
          end
          if self[:creator_tesim]
            xml['mods'].name do
              self[:creator_tesim]&.each { |creator_display| xml['mods'].namePart(creator_display.to_s) }
              xml['mods'].roleTerm "Creator"
            end
          end
          if self[:photographer_tesim]
            xml['mods'].name do
              self[:photographer_tesim]&.each { |creator_display| xml['mods'].namePart(creator_display.to_s) }
              xml['mods'].roleTerm "Photographer"
            end
          end
          xml['mods'].titleInfo do
            self[:title_tesim]&.each { |title| xml['mods'].title title.to_s }
            self[:alternative_title_tesim]&.each { |alternative_title| xml['mods'].title( { type: "alternative" } ,alternative_title.to_s) }
          end
          if self[:extent_tesim]
            xml['mods'].physicalDescription do
              self[:extent_tesim]&.each { |extent| xml['mods'].extent extent.to_s }
            end
          end
          if self[:medium_tesim]
            xml['mods'].physicalDescription do
              self[:medium_tesim]&.each { |medium| xml['mods'].extent medium.to_s }
            end
          end
          # self[:findingAid_ssim]&.each { |finding_aid| xml['mods'].relatedItem({ displayLabel: 'Finding Aid', "xlink:href" => finding_aid }) }
          # self[:url_suppl_ssim]&.each { |url_suppl| xml['mods'].relatedItem({ displayLabel: 'Related Resource', "xlink:href" => url_suppl }) }
          # self[:partOf_tesim]&.each { |part_of| xml['mods'].relatedItem({ displayLabel: 'Related Exhibition or Resource', "xlink:href" => part_of }) }
  
          if related_item_host.any? { |related_item| self[related_item].present? }
            xml['mods'].relatedItem({ type: "host" }) do
              if self[:box_ssim] # 60
                xml['mods'].part do
                  xml['mods'].detail({ type: "Box" }) do
                    self[:box_ssim]&.each { |value| xml['mods'].text_ value.to_s }
                  end
                end
              end
  
              if self[:folder_ssim] # 61
                xml['mods'].part do
                  xml['mods'].detail({ type: "Folder" }) do
                    self[:folder_ssim]&.each { |value| xml['mods'].text_ value.to_s }
                  end
                end
              end
  
              if self[:sourceCreator_tesim] # 62
                xml['mods'].name do
                  self[:sourceCreator_tesim]&.each { |value| xml['mods'].namePart value.to_s }
                end
              end
  
              if self[:sourceTitle_tesim] # 63
                xml['mods'].titleInfo do
                  self[:sourceTitle_tesim]&.each { |value| xml['mods'].title value.to_s }
                end
              end
              if related_origininfo_item.any? { |origininfo_item| self[origininfo_item].present? }
                xml['mods'].originInfo do
                  if self[:sourceCreated_tesim] # 64
                    xml['mods'].place do # newMODSTag
                      self[:sourceCreated_tesim]&.each { |source_created| xml['mods'].placeTerm({ type: 'text' }, source_created.to_s) }
                    end
                  end
                  self[:sourceDate_tesim]&.each { |value| xml['mods'].dateCreated value.to_s } # 66
                  self[:sourceEdition_tesim]&.each { |value| xml['mods'].edition value.to_s } # 67
                end
              end
  
              self[:sourceNote_tesim]&.each { |value| xml['mods'].note value.to_s } # 68sourceNote_tesim
            end
          end
  
          if origininfo_item.any? { |origininfo_item| self[origininfo_item].present? }
            xml['mods'].originInfo do
              self[:edition_ssim]&.each { |value| xml['mods'].edition value.to_s } # 76
              if self[:creationPlace_ssim] # 77
                xml['mods'].place do # newMODSTag
                  self[:creationPlace_ssim]&.each { |value| xml['mods'].placeTerm({ type: 'text' }, value.to_s) }
                end
              end
              self[:publisher_ssim]&.each { |value| xml['mods'].publisher value.to_s } # 78
              self[:date_ssim]&.each { |value| xml['mods'].dateCreated value.to_s } # 79
            end
          end
  
          if topic_geographic.any? { |topic_geographic| self[topic_geographic].present? }
            xml['mods'].subject do
              self[:subjectName_ssim]&.each { |value| xml['mods'].name({ type: 'personal' }, value.to_s) } # 88
              self[:subjectTopic_ssim]&.each { |value| xml['mods'].topic value.to_s } # 90
              self[:subjectGeographic_ssim]&.each { |value| xml['mods']. geographic value.to_s } # 91
              if self[:scale_tesim] # 95
                xml['mods'].cartographics do #
                  self[:scale_tesim]&.each { |value| xml['mods'].scale value.to_s } # 95
                end
              end
            end
          end
=begin
          xml['mods'].location do
            if self[:orbisBibId_ssi] # 104
              xml['mods'].holdingSimple do
                xml['mods'].copyInformation do
                  xml['mods'].electronicLocator self[:orbisBibId_ssi]
                end
              end
            end # Need test for the below
            xml['mods'].url({ access: 'object in context',
                              displayLabel: 'View information and digital image(s) in the Beinecke Library’s Digital Images Online database',
                              "xlink:href" => "https://collections.library.yale.edu/catalog/#{self[:oid_ssi]}" })
            if self[:thumbnail_path_ss].present?
              thumbnail_array = self[:thumbnail_path_ss].split("/")
              thumbnail_array[7] = "full"
              thumbnail_array[0] = 'https:'
              raw_object_value = thumbnail_array.join("/")
              xml['mods'].url({ access: 'preview', "xlink:href" => self[:thumbnail_path_ss] })
              xml['mods'].url({ access: 'raw object', "xlink:href" => raw_object_value })
            end
          end
=end
        end
      end
      Nokogiri::XML(builder.to_xml).root.to_xml
    end
    # rubocop:enable Metrics/BlockLength,Metrics/MethodLength,Metrics/PerceivedComplexity,Metrics/AbcSize/Metrics/
  
    def valid_formats
      ["text",
       "cartographic",
       "notated music",
       "sound recording",
       "sound recording-musical",
       "sound recording-nonmusical",
       "still image", "moving image",
       "three dimensional object",
       "software, multimedia",
       "mixed material"]
    end
  
    def related_item_host
      [:box_ssim,
       :folder_ssim,
       :sourceCreator_tesim,
       :sourceTitle_tesim,
       :sourceCreated_tesim,
       :sourceDate_tesim,
       :sourceEdition_tesim,
       :sourceNote_tesim]
    end
  
    def related_origininfo_item
      [:sourceCreated_tesim,
       :sourceDate_tesim,
       :sourceEdition_tesim]
    end
  
    def origininfo_item
      [:edition_ssim,
       :creationPlace_ssim,
       :publisher_ssim,
       :date_ssim]
    end
  
    def topic_geographic
      [:subjectName_ssim,
       :subjectTopic_ssim,
       :subjectGeographic_ssim,
       :scale_tesim]
    end
  
    # rubocop:enable Metrics/ModuleLength,Metrics/CyclomaticComplexity
  end