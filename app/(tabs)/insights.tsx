import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, TrendingUp, TrendingDown, ArrowUpRight, Mic, ChevronDown } from 'lucide-react-native';

export default function InsightsDashboardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <View style={styles.headerRight}>
          <Text style={styles.headerPeriod}>Last 30 Days</Text>
          <ChevronDown color="#9ca3af" size={20} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* AI Insights Card */}
        <View style={styles.aiInsightCard}>
          <View style={styles.aiInsightHeader}>
            <Sparkles color="#00FFFF" size={28} />
            <Text style={styles.aiInsightTitle}>AI-Powered Insights</Text>
          </View>
          <Text style={styles.aiInsightText}>
            Your electronic sales are up 15% this month. Consider restocking popular phone models to meet demand.
          </Text>
        </View>

        {/* KPI Cards */}
        <View style={styles.kpiContainer}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Total Inventory Value</Text>
            <Text style={styles.kpiValue}>$1.2M</Text>
            <View style={styles.kpiChange}>
              <TrendingUp color="#10b981" size={16} />
              <Text style={styles.kpiChangePositive}>+5.2%</Text>
            </View>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Stock Turnover Rate</Text>
            <Text style={styles.kpiValue}>4.5</Text>
            <View style={styles.kpiChange}>
              <TrendingDown color="#ef4444" size={16} />
              <Text style={styles.kpiChangeNegative}>-1.8%</Text>
            </View>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Out of Stock Items</Text>
            <Text style={styles.kpiValue}>12</Text>
            <View style={styles.kpiChange}>
              <ArrowUpRight color="#10b981" size={16} />
              <Text style={styles.kpiChangePositive}>+3</Text>
            </View>
          </View>
        </View>

        {/* Line Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Inventory Value Over Time</Text>
          <View style={styles.lineChartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>=� Line Chart</Text>
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>Week 1</Text>
            <Text style={styles.chartLabel}>Week 2</Text>
            <Text style={styles.chartLabel}>Week 3</Text>
            <Text style={styles.chartLabel}>Week 4</Text>
          </View>
        </View>

        {/* Charts Row */}
        <View style={styles.chartsRow}>
          {/* Donut Chart */}
          <View style={styles.smallChartCard}>
            <Text style={styles.chartTitle}>Inventory Category Breakdown</Text>
            <View style={styles.donutChartPlaceholder}>
              <Text style={styles.donutCenterText}>100%</Text>
              <Text style={styles.donutSubText}>Total</Text>
            </View>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#a855f7' }]} />
                <Text style={styles.legendText}>Electronics (60%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#f97316' }]} />
                <Text style={styles.legendText}>Apparel (30%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
                <Text style={styles.legendText}>Home (10%)</Text>
              </View>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.smallChartCard}>
            <Text style={styles.chartTitle}>Top Selling Products</Text>
            <View style={styles.barListContainer}>
              <View style={styles.barListItem}>
                <Text style={styles.barListLabel}>Phone X</Text>
                <View style={styles.barListBarContainer}>
                  <View style={[styles.barListBar, { width: '75%' }]} />
                </View>
                <Text style={styles.barListValue}>750</Text>
              </View>

              <View style={styles.barListItem}>
                <Text style={styles.barListLabel}>Laptop Pro</Text>
                <View style={styles.barListBarContainer}>
                  <View style={[styles.barListBar, { width: '55%' }]} />
                </View>
                <Text style={styles.barListValue}>550</Text>
              </View>

              <View style={styles.barListItem}>
                <Text style={styles.barListLabel}>Smartwatch</Text>
                <View style={styles.barListBarContainer}>
                  <View style={[styles.barListBar, { width: '40%' }]} />
                </View>
                <Text style={styles.barListValue}>400</Text>
              </View>

              <View style={styles.barListItem}>
                <Text style={styles.barListLabel}>Earbuds</Text>
                <View style={styles.barListBarContainer}>
                  <View style={[styles.barListBar, { width: '30%' }]} />
                </View>
                <Text style={styles.barListValue}>300</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actionable Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Actionable Recommendations</Text>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Item X is running low.</Text>
              <Text style={styles.recommendationSubtitle}>Only 5 units left in stock.</Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Reorder Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Item Y has low turnover.</Text>
              <Text style={styles.recommendationSubtitle}>Consider a promotional discount.</Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Create Promotion</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Voice Command FAB */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Mic color="#ffffff" size={24} />
          <Text style={styles.fabText}>Ask me anything...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerPeriod: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  aiInsightCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    padding: 20,
    marginBottom: 24,
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  aiInsightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  aiInsightText: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  kpiContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    padding: 16,
  },
  kpiLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiChangePositive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10b981',
  },
  kpiChangeNegative: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ef4444',
  },
  chartCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    padding: 16,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 16,
  },
  lineChartPlaceholder: {
    height: 192,
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartPlaceholderText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chartLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  chartsRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  smallChartCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    padding: 16,
  },
  donutChartPlaceholder: {
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  donutCenterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  donutSubText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  legendContainer: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  barListContainer: {
    gap: 12,
    paddingTop: 8,
  },
  barListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barListLabel: {
    width: 80,
    fontSize: 14,
    color: '#9ca3af',
  },
  barListBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(71, 85, 105, 1)',
    borderRadius: 5,
  },
  barListBar: {
    height: '100%',
    backgroundColor: '#00BFFF',
    borderRadius: 5,
  },
  barListValue: {
    width: 40,
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e8f0',
    textAlign: 'right',
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  recommendationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  actionButton: {
    backgroundColor: '#00FFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomSpacer: {
    height: 100,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#00BFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});
