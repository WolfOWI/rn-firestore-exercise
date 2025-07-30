import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/core";
import { deleteBucketItem, updateBucketItem } from "../services/DbService";

const DetailsScreen = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const { item, onItemDeleted } = route.params;

  const handleDelete = async () => {
    const deleteSuccess = await deleteBucketItem(item.id);
    if (deleteSuccess) {
      if (onItemDeleted) {
        onItemDeleted();
      }
      navigation.goBack();
    } else {
      Alert.alert("Error", "Couldn't delete item. Please try again.");
    }
  };

  const toggleComplete = async () => {
    const updateSuccess = await updateBucketItem(item.id, { isCompleted: !item.isCompleted });
    if (updateSuccess) {
      if (onItemDeleted) {
        onItemDeleted();
      }
      navigation.goBack();
    } else {
      Alert.alert("Error", "Couldn't update item.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Due date: {item.due}</Text>
      <Text>Priority: {item.priority ? "Yes" : "No"}</Text>

      <Button
        title={item.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        color={item.isCompleted ? "orange" : "green"}
        disabled={false}
        onPress={toggleComplete}
      />

      <Button title="Delete Item" color="red" disabled={false} onPress={handleDelete} />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
});
