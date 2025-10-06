import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings, Search, Mic, Bell } from 'lucide-react-native';

export default function InventoryManagementScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userAvatar}>
          <User color="#ffffff" size={20} />
        </View>
        <Text style={styles.headerTitle}>AI Dashboard</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardHighlight]}>
            <Text style={styles.statLabel}>Total Stock Value</Text>
            <Text style={styles.statValue}>$1.2M</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SKUs</Text>
            <Text style={styles.statValue}>1,500</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Turnover Rate</Text>
            <Text style={styles.statValue}>4.5</Text>
          </View>
        </View>

        {/* Sales Performance Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sales Performance</Text>
          <Text style={styles.chartValue}>$250,000</Text>
          <View style={styles.chartMetrics}>
            <Text style={styles.chartPeriod}>This Month</Text>
            <Text style={styles.chartGrowth}>+5.2%</Text>
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>=È Chart</Text>
          </View>
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>Week 1</Text>
            <Text style={styles.chartLabel}>Week 2</Text>
            <Text style={styles.chartLabel}>Week 3</Text>
            <Text style={styles.chartLabel}>Week 4</Text>
          </View>
        </View>

        {/* Predictive Demand Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Predictive Demand</Text>
          <Text style={styles.chartValue}>Next 30 Days</Text>
          <View style={styles.chartMetrics}>
            <Text style={styles.chartPeriod}>Forecast</Text>
            <Text style={styles.chartGrowth}>+8%</Text>
          </View>
          <View style={styles.barChartContainer}>
            <View style={styles.barChartItem}>
              <View style={[styles.bar, { height: 120 }]} />
              <Text style={styles.barLabel}>Product A</Text>
            </View>
            <View style={styles.barChartItem}>
              <View style={[styles.bar, { height: 84 }]} />
              <Text style={styles.barLabel}>Product B</Text>
            </View>
            <View style={styles.barChartItem}>
              <View style={[styles.bar, { height: 36 }]} />
              <Text style={styles.barLabel}>Product C</Text>
            </View>
            <View style={styles.barChartItem}>
              <View style={[styles.bar, { height: 84 }]} />
              <Text style={styles.barLabel}>Product D</Text>
            </View>
          </View>
        </View>

        {/* Low Stock Alerts */}
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>Low Stock Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.alertItem}>
            <Text style={styles.alertProductName}>Quantum Hyper-Drive</Text>
            <View style={styles.alertActions}>
              <Text style={styles.alertQuantity}>5 Units Left</Text>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.alertItem}>
            <Text style={styles.alertProductName}>Plasma Injector Cells</Text>
            <View style={styles.alertActions}>
              <Text style={styles.alertQuantity}>2 Units Left</Text>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Search color="#13a4ec" size={28} />
          <Text style={styles.footerLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerMicButton}>
          <Mic color="#ffffff" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Bell color="#13a4ec" size={28} />
          <Text style={styles.footerLabel}>Alerts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101c22',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#13a4ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#101c22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(19, 164, 236, 0.3)',
    padding: 24,
  },
  statCardHighlight: {
    shadowColor: '#13a4ec',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chartCard: {
    backgroundColor: '#101c22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(19, 164, 236, 0.3)',
    padding: 24,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 8,
  },
  chartValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  chartMetrics: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chartPeriod: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  chartGrowth: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0bda57',
  },
  chartPlaceholder: {
    height: 148,
    backgroundColor: 'rgba(19, 164, 236, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  barChartItem: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    maxWidth: 60,
    backgroundColor: 'rgba(19, 164, 236, 0.2)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#13a4ec',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
  },
  alertCard: {
    backgroundColor: '#101c22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(19, 164, 236, 0.3)',
    padding: 24,
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  viewAllButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#13a4ec',
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  alertProductName: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  alertActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  alertQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  reorderButton: {
    backgroundColor: '#13a4ec',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#13a4ec',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  reorderButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bottomSpacer: {
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 28, 34, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(19, 164, 236, 0.3)',
    paddingVertical: 16,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerMicButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#13a4ec',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#13a4ec',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  footerLabel: {
    fontSize: 12,
    color: '#13a4ec',
    marginTop: 4,
  },
});
