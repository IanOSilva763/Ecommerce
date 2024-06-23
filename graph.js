import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Graph = ({ data }) => {
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <BarChart
        style={{ marginVertical: 8, borderRadius: 16 }}
        data={data}
        width={screenWidth - 16}
        height={250}
        fromZero={true} // Começa o eixo Y do zero
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        yAxisLabel="Qtd "
        yAxisSuffix="" // Remove o sufixo padrão para evitar duplicação
        yAxisInterval={1} // Intervalo entre os rótulos do eixo Y
      />
    </View>
  );
};

export default Graph;
