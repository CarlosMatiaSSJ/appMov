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
        <Text style={styles.suggestionsTitle}>Vistas</Text>

        {/* Second row of cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardsRow}>
            <View style={[styles.card, highlighted && styles.cardHighlighted]}>
              <Text style={styles.cardDescription}>Carrito</Text>
              <Image
                source={require('../imgs/logoAzul.png')} // Replace with the actual image path
                style={styles.cardImage}
              />
              <TouchableWithoutFeedback onPress={() => alert('Botón 1 presionado')}>
                <View>
                  <button> Carrito </button>
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
                  <button> Menú </button>
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
                  <button> Inicio </button>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Poli Waiter</Text>
        <Text style={styles.footerCopyright}>© 2023</Text>
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerCopyright: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Index;

