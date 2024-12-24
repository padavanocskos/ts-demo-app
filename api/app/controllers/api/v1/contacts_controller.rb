# frozen_string_literal: true

# General contacts controller
module Api
  module V1
    class ContactsController < ApiController
      def index
        @q = Contact.ransack(params[:q])
        @contacts = @q.result.page(params[:page].to_i + 1).per(params[:per])
        render json: { rows: @contacts, totalRows: @contacts.total_count }
      end

      def create
        @contact = Contact.new(contact_params)

        if @contact.save
          render json: @contact, status: :created
        else
          render json: @contact.errors, status: :unprocessable_entity
        end
      end

      # move this to API controller
      # add service for merge this metadata with FE vardefs
      def fields_meta_data
        ret = []
        Contact.columns_hash.each do |k,v|
          ret << { name: k.underscore, label: I18n.t("contact.#{k}"), type: v.type }
        end
        render json: { field_defs: ret }
      end

      private

      def contact_params
        params.require(:contact).permit(:first_name, :last_name, :middle_name, :phone1, :phone2, :mobile1, :mobile2) # A dd the permitted attributes here
      end
    end
  end
end
