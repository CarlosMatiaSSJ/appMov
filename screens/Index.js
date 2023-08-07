import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableWithoutFeedback } from 'react-native';

const Index = () => {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, []);

  const handleMouseEnter = () => {
    setHighlighted(true);
  };

  const handleMouseLeave = () => {
    setHighlighted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Animated.Text style={[styles.nameText, { transform: [{ translateY: jumpAnim }] }]}>
          ¡Poli Waiter!
        </Animated.Text>
      </View>

      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraphText}>
          Bienvenido a la cafetería Poli Waiter, gracias por elegirnos.
        </Text>
      </View>

      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Recomendaciones</Text>

        {/* First row of cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardsRow}>
            <TouchableWithoutFeedback
              onPressIn={handleMouseEnter}
              onPressOut={handleMouseLeave}
            >
              <View style={[styles.card, highlighted && styles.cardHighlighted]}>
                <Image
                  source={require('../imgs/logoAzul.png')}
                  style={[styles.cardImage, { width: '90%', height: '90%' }]}
                />
                <Text style={styles.cardDescription}>Hot-Dogs</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPressIn={handleMouseEnter}
              onPressOut={handleMouseLeave}
            >
              <View style={[styles.card, highlighted && styles.cardHighlighted]}>
                <Image
                  source={require('../imgs/logoAzul.png')}
                  style={[styles.cardImage, { width: '90%', height: '90%' }]}
                />
                <Text style={styles.cardDescription}>Tacos</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPressIn={handleMouseEnter}
              onPressOut={handleMouseLeave}
            >
              <View style={[styles.card, highlighted && styles.cardHighlighted]}>
                <Image
                  source={require('../imgs/logoAzul.png')}
                  style={[styles.cardImage, { width: '90%', height: '90%' }]}
                />
                <Text style={styles.cardDescription}>Burritos</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Second row of cards */}
        <View style={styles.cardsContainer}>
        <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Vistas</Text>
          <View style={styles.cardsRow}>
            <View style={[styles.card, highlighted && styles.cardHighlighted]}>
              <Text style={styles.cardDescription}>Carrito</Text>
              <Image
                source={require('../imgs/logoAzul.png')} // Replace with the actual image path
                style={styles.cardImage}
              />
              <TouchableWithoutFeedback onPress={() => alert('Botón 1 presionado')}>
                <View>
                  <Text>Botón 1</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={[styles.card, highlighted && styles.cardHighlighted]}>
              <Text style={styles.cardDescription}>Menú</Text>
              <Image
                source={require('../imgs/logoAzul.png')} // Replace with the actual image path
                style={styles.cardImage}
              />
              <TouchableWithoutFeedback onPress={() => alert('Botón 2 presionado')}>
                <View>
                  <Text>Botón 2</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={[styles.card, highlighted && styles.cardHighlighted]}>
              <Text style={styles.cardDescription}>Inicio</Text>
              <Image
                source={require('../imgs/logoAzul.png')} // Replace with the actual image path
                style={styles.cardImage}
              />
              <TouchableWithoutFeedback onPress={() => alert('Botón 3 presionado')}>
                <View>
                  <Text>Botón 3</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameContainer: {
    marginBottom: 10,
  },
  nameText: {
    fontSize: 36,
    fontWeight: 'bold',
    top: 0,
    color: 'red',
  },
  paragraphContainer: {
    marginBottom: 20,
  },
  paragraphText: {
    fontSize: 16,
  },
  suggestionsContainer: {
    alignItems: 'center',
    width: 100,
    height: 80,
  },
  suggestionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 4,
    color: 'blue',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: 100,
    height: 150,
    borderRadius: 15,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    opacity: 1,
  },
  cardHighlighted: {
    opacity: 0.5,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: -22,
  },
});

export default Index;