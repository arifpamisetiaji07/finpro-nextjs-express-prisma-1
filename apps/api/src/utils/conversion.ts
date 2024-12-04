const formatToIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };
  
  // Contoh penggunaan:
  const priceInIDR = formatToIDR(100000);
  console.log(priceInIDR); // "Rp100.000,00"
  