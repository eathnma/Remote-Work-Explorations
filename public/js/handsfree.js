handsfree = new Handsfree({
    showDebug: true,
    
    // Use the hand model with custom config
    hands: {
      // Always make sure to enable them
      enabled: true,
      
      // Let's track up to 4 hands. It's best to be kind and ask permission first tho!
      maxNumHands: 4,
    }
  })
  
  // Start webcam and tracking (personally, I always like to ask first)
  handsfree.start()