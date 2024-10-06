import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Favourites');  // Default active tab

  const renderGridContent = () => {
    switch (activeTab) {
      case 'Posts':
        return (
          <View style={styles.favoritesGrid}>
            <Text style={styles.gridText}>No Posts yet!</Text>
          </View>
        );
      case 'My Crops':
        return (
          <View style={styles.favoritesGrid}>
            <Image source={{ uri: 'https://images.everydayhealth.com/images/diet-nutrition/corn-101-a-complete-guide-1440x810.jpg' }} style={styles.favoriteItem} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Vehn%C3%A4pelto_6.jpg' }} style={styles.favoriteItem} />
          </View>
        );
      case 'Favourites':
        return (
          <View style={styles.favoritesGrid}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.favoriteItem} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.favoriteItem} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.favoriteItem} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.favoriteItem} />
          </View>
        );
      case 'Friends':
        return (
          <View style={styles.favoritesGrid}>
            <Text style={styles.gridText}>No Friends added yet!</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXvMEfLqXXHMk7r1G0BdTmHak_WHSMJ34rw&s' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Celine (NASA) </Text>
        <Text style={styles.profileRole}>Advanced Farmer</Text>
      </View>

      {/* Tabs Section */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('My Crops')}>
          <Text style={activeTab === 'My Crops' ? styles.activeTabText : styles.tabText}>My Crops</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Posts')}>
          <Text style={activeTab === 'Posts' ? styles.activeTabText : styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Favourites')}>
          <Text style={activeTab === 'Favourites' ? styles.activeTabText : styles.tabText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Friends')}>
          <Text style={activeTab === 'Friends' ? styles.activeTabText : styles.tabText}>Friends</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Content */}
      {renderGridContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePronoun: {
    fontSize: 16,
    color: '#666',
  },
  profileRole: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  favoriteItem: {
    width: 150,
    height: 150,
    borderRadius: 15,
    margin: 10,
  },
  gridText: {
    fontSize: 18,
    color: '#666',
  },
});

export default ProfileScreen;
