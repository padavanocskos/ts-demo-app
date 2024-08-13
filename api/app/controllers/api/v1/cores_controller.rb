module Api
  module V1
    class CoresController < ApiController
      def index
        @q = Core.ransack(params[:q])
        @cores = @q.result.page(params[:page].to_i + 1).per(params[:per])
        render json: { rows: @cores, totalRows: @cores.total_count }
      end

      def create
        @core = Core.new(contact_params)

        if @core.save
          render json: @core, status: :created
        else
          render json: @core.errors, status: :unprocessable_entity
        end
      end
    end
  end
end