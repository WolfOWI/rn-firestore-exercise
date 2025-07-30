import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMyBucketList } from "../services/DbService";

const ListScreen = () => {
  const navigation: any = useNavigation();

  // Navigate to the add screen
  const goToAdd = () => {
    navigation.navigate("Add", { onItemCreated: getNewData });
  };

  // Navigate to the details screen
  const goToDetails = (item: any) => {
    navigation.navigate("Details", {
      item,
      onItemDeleted: getNewData,
    });
  };

  const [bucketList, setBucketList] = useState<any[]>([]);

  // Load data on initial load
  useEffect(() => {
    getNewData();
  }, []);

  // Get new data from the database (refresh)
  const getNewData = async () => {
    const items = await getMyBucketList();
    setBucketList(items);
    // console.log("Items: ", items);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable style={styles.addButton} onPress={goToAdd}>
          <Text style={styles.addButtonText}>Add</Text>
          <Entypo name="bucket" size={16} color="green" />
        </Pressable>

        {bucketList.length > 0 ? (
          bucketList.map((item) => (
            <TouchableOpacity style={styles.card} onPress={() => goToDetails(item)} key={item.id}>
              <View style={styles.cardTitle}>
                <Text>{item.title}</Text>
                {item.isCompleted && <AntDesign name="checkcircle" size={24} color="green" />}
              </View>
              {item.priority ? (
                <AntDesign name="star" size={24} color="orange" />
              ) : (
                <AntDesign name="star" size={24} color="lightgrey" />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text>No items in the bucket list</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addButton: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  addButtonText: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
});
