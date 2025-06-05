import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'
    import PipelineCard from '@/components/molecules/PipelineCard'

    const PipelineBoard = ({ pipelineStages, deals, contacts, handleDragOver, handleDrop, handleDragStart, formatCurrency, getDealsForStage }) => {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Text as="h3" className="text-lg font-semibold text-gray-900">Sales Pipeline</Text>
            <Button
              className="inline-flex items-center px-4 py-2 gradient-bg text-white font-medium rounded-xl shadow-card hover:shadow-card-hover transition-all"
              onClick={() => toast.info('Deal creation feature coming soon!')}
            >
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-96">
            {pipelineStages.map((stage) => (
              <div
                key={stage.id}
                className={`${stage.color} rounded-xl p-4 border-2 border-dashed transition-all`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Text as="h4" className="font-semibold text-gray-700">{stage.title}</Text>
                  <Text as="span" className="text-sm text-gray-500 bg-white px-2 py-1 rounded-lg">
                    {getDealsForStage(stage.id).length}
                  </Text>
                </div>

                <div className="space-y-3">
                  {getDealsForStage(stage.id).map((deal) => (
                    <PipelineCard
                      key={deal.id}
                      deal={deal}
                      contacts={contacts}
                      formatCurrency={formatCurrency}
                      handleDragStart={handleDragStart}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default PipelineBoard