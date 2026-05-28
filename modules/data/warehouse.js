// ==========================
// МОДЕЛЬ: Warehouse + Stock
// ==========================

const warehouse = {
  zones: [
    {
      zoneId: 'A',

      racks: [
        {
          rackId: '01',

          locations: [
            {
              id: 'A-01-01',
              locId: '01',

              // 👉 здесь будут остатки
              stock: [
                {
                  productId: 'PRD-001',
                  series: 'S-1001',
                  qty: 120,
                },
              ],
            },

            {
              id: 'A-01-02',
              locId: '02',
              stock: [],
            },

            {
              id: 'A-01-03',
              locId: '03',
              stock: [
                {
                  productId: 'Натрію тіосульфат',
                  series: '117019/25',
                  qty: 2500,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default warehouse;